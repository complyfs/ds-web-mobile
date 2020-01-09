import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
//import * as config from '../../../auth_config.json';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: environment.auth0.domain,
      client_id: environment.auth0.clientID,
      redirect_uri: environment.auth0.callbackUri,
      audience: environment.auth0.apiIdentifier,
      scope: environment.auth0.requestedScopes
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  // Create subject and public observable of user profile data
  userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router) { }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => { this.userProfileSubject$.next(user); })
    );
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently
  getTokenSilently$(options?): Observable<string> {
    console.log('in getTokenSilently$');
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      this.loggedIn = !!response;
    });
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: environment.auth0.callbackUri,
        appState: { target: redirectPath },
        // scope: environment.auth0.requestedScopes,
      });
    }, e => {
      console.log('Login Error:', e);
    });
  }

  handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    const authComplete$ = this.handleRedirectCallback$.pipe(
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; get user and login status
        return combineLatest(
          this.getUser$(),
          this.isAuthenticated$
        );
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user, token, and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Redirect to target route after callback processing
      this.router.navigate([targetRoute]);
    }, e => {
      console.log('Login Error2:', e);
      let errorReasonCode = 'unknown';
      if (e.error_description === 'user is blocked') { errorReasonCode = 'admin_block'; }

      this.router.navigate(['/public/loginerror', errorReasonCode]);
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: environment.auth0.clientID,
        returnTo: window.location.origin
      });
    });
  }

  async inRoleNotObservable(targetGroupList: string[]) {
    const roles: any = await this.getTokenClaim(environment.auth0.namespace + 'roles');
    if (!roles) {

      console.log('auth.inRoleNotOb returns false, no roles');
      return false;
    }

    for (let i = 0; i < targetGroupList.length; i++) {
      if (roles.includes(targetGroupList[i])) {
        console.log('auth.inRoleNotOb returns true');
        return true;
      }
    }

    console.log('auth.inRoleNotOb returns false');
    return false;
  }

  public inRole(targetGroupList: string[]): Observable<boolean> {
    return this.userProfile$.pipe (
      map ( (user) => {
        if (!user) {
          // console.log('auth.inRole returns false');
          return false;
        }

        const roles = user[environment.auth0.namespace + 'roles'];

        for (let i = 0; i < targetGroupList.length; i++) {
          if (roles.includes(targetGroupList[i])) {
            return true;
          }
        }

        // console.log('auth.inRole returns false');
        return false;
      })
    );
  }

  async getToken(): Promise<string> {
    return await this.getTokenSilently$().toPromise();
  }

  decodeToken() {
    return new Promise ( async(resolve, reject) => {
      try {
        const token = await this.getToken();
        //console.log('token');
        //console.log(token);

        const decodedToken = this.jwtHelper.decodeToken(token);
        //console.log('decodedToken');
        console.log(decodedToken);

        const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
        const isExpired = this.jwtHelper.isTokenExpired(token);

        return resolve(decodedToken);
      } catch (e) {
        return reject (e);
      }
    });
  }

  getTokenClaim(claim): Promise<any> {
    return new Promise ( async (resolve, reject) => {
      try {
        const token = await this.decodeToken();
        return resolve(token[claim]);
      } catch (e) {
        return reject (e);
      }
    });
  }

  getTenant(): string {
    return 'bancobig';
  }

}
