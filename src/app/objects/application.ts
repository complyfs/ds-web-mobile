
export interface Application {
  _id: string;
  name: string;
  description: string;
  users: AppUser[];
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


export const appContactRoles = [
  { id: 'business-owner', label: 'Business Owner'},
  { id: 'application-owner', label: 'Application Owner'},
  { id: 'production-manager', label: 'Production Manager'},
  { id: 'cto-owner', label: 'CTO Owner'},
];
