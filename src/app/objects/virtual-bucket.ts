
export interface VirtualBucket {
  _id: string;
  applicationId: string;
  description: string;
  encrypted: string;
  providerEndpoints: ProviderEndpoint[];
}

export interface ProviderEndpoint {
  id: string;
  name: string;
  provider: string;
  providerCredentialId: string; // this includes the provider
  region: string; // flexible with AWS, fixed by credential for Azure
  type: string;
  active: boolean;
}
