export interface Application {
  _id: string;
  name: string;
  description: string;
  users: AppUser[];
  dataStores: DataStore[];
}

export interface AppUser {
  user_id: string;
  appRole: string;
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
