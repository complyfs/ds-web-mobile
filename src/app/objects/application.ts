import {stringify} from "querystring";

export interface Application {
  _id: string;
  name: string;
  description: string;
  users: AppUser[];
  dataStores: DataStore[];
  appContacts: AppContact[];
  lineOfBusiness: string;
  subLineOfBusiness: string;
  costCenter: string;
  appId: string;
  appRegistryId: string;
}

export interface AppUser {
  user_id: string;
  appRights: string;
}

export interface DataStore {
  id: string;
  name: string;
  description: string;
  encrypted: string;
  dataEndpoints: DataEndpoint[];
}

export interface DataEndpoint {
  id: string;
  name: string;
  credentialId: string; //this includes the provider
  region: string; // flexible with AWS, fixed by credential for Azure
  type: string;
  active: string;
}

export interface AppContact {
  id: string;
  firstName: string;
  lastName: string;
  tel1: string;
  tel2: string;
  email: string;
  title: string;
  contactRole: string;
}

export interface Credential {
  _id: string;
  name: string;
  applicationId: string;
}


export const appContactRoles = [
  { id: 'business-owner', label: 'Business Owner'},
  { id: 'application-owner', label: 'Application Owner'},
  { id: 'production-manager', label: 'Production Manager'},
  { id: 'cto-owner', label: 'CTO Owner'},
];
