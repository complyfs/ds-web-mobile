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

  adminGetApplications(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getApplications', params);
  }

  adminGetApplication(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getApplication', params);
  }

  adminSaveApplication(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/saveApplication', params);
  }

  adminDeleteApplication(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteApplication', params);
  }

  getApplicationGraphs(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getApplicationGraphs', params);
  }

  adminGetProviderCredentials(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getProviderCredentials', params);
  }

  adminGetProviderCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getProviderCredential', params);
  }

  adminSaveProviderCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/saveProviderCredential', params);
  }

  adminDeleteProviderCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteProviderCredential', params);
  }

  adminGetAuth0Clients(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getAuth0Clients', params);
  }

  adminGetAuth0Client(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getAuth0Client', params);
  }

  adminGetAuth0ClientGrants(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getAuth0ClientGrants', params);
  }

  adminCreateRestCredAuth0Client(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/createRestCredAuth0Client', params);
  }

  adminDeleteRestCredAuth0Client(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteRestCredAuth0Client', params);
  }

  adminUpdateAuth0Client(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/updateAuth0Client', params);
  }

  adminUpdateAuth0ClientGrants(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/updateAuth0ClientGrants', params);
  }

  adminGetRestCredentials(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getRestCredentials', params);
  }

  adminGetRestCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getRestCredential', params);
  }

  adminSaveRestCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/saveRestCredential', params);
  }

  adminDeleteRestCredential(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteRestCredential', params);
  }

  adminGetDataStores(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getDataStores', params);
  }

  adminGetDataStore(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/getDataStore', params);
  }

  adminSaveDataStore(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/saveDataStore', params);
  }

  adminDeleteDataStore(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteDataStore', params);
  }

  adminCreateDataEndpoint(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/createDataEndpoint', params);
  }

  adminDeleteDataEndpoint(params: any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/admin/deleteDataEndpoint', params);
  }
}
