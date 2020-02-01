
export interface DataStore {
  _id: string;
  applicationId: string;
  name: string;
  description: string;
  encrypted: string;
  dataEndpoints: DataEndpoint[];
}

export interface DataEndpoint {
  id: string;
  name: string;
  credentialId: string; // this includes the provider
  region: string; // flexible with AWS, fixed by credential for Azure
  type: string;
  active: string;
}
