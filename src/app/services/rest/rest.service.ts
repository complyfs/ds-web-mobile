import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  publicGet(): Observable <any> {
    return this.http.get(environment.restServiceURL + '/public/');
  }

  publicPost(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/public/', params);
  }

  privateGet(): Observable <any> {
    return this.http.get(environment.restServiceURL + '/private/');
  }

  privatePost(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/private/', params);
  }

  adminGetUsers(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getUsers', params);
  }

  adminGetUser(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getUser', params);
  }

  adminUpdateUser(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/updateUser', params);
  }

  adminGetRoles(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getRoles', params);
  }

  privateRequirePostPermission(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/private/requirePostPermission', params);
  }

  privateRequireNeverPermission(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/private/requireNeverPermission', params);
  }

  setUsersStripeCustomerId(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/setUsersStripeCustomerId', params);
  }

  adminGetLogs(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getLogs', params);
  }

  superadminGetTenants(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/superadmin/getTenants', params);
  }

  superadminGetTenant(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/superadmin/getTenant', params);
  }

  superadminSaveTenant(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/superadmin/saveTenant', params);
  }
}
