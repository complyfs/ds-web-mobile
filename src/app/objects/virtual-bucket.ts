
export interface VirtualBucket {
  _id: string;
  applicationId: string;
  description: string;
  encrypted: boolean;
  providerEndpoints: ProviderEndpoint[];
}

export interface ProviderEndpoint {
  providerBucket: string; // Acts as the ID, used to be named 'id'
  name: string;
  provider: string;
  providerCredentialId: string; // this includes the provider
  region: string; // flexible with AWS, fixed by credential for Azure
  type: string;
  active: boolean;
}
