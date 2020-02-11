// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  env: 'Prod',
  companyName: 'DataStrata.io',
  contactUsEmail: 'info@datastrata.io',

  dsSocketURL: 'https://app.datastrata.io',
  dsTickerLength: 5,

  providers: [
    {id: 'aws', name: 'AWS'},
    {id: 'azure', name: 'Azure'},
  ],

  providerRegions: [
    { provider: 'aws', region: 'us-west-1'},
    { provider: 'aws', region: 'eu-frankfurt-1'},
    { provider: 'aws', region: 'as-tokyo-1'},
    { provider: 'azure', region: 'us-seattle'},
    { provider: 'azure', region: 'eu-london'},
    { provider: 'azure', region: 'as-shanghai'},
  ],

  providerEndpointTypes: [
    { provider: 'aws', type: 'aws-s3', label: 'AWS S3'},
    { provider: 'aws', type: 'aws-glacier', label: 'AWS Glacier'},
    { provider: 'azure', type: 'azure-blob', label: 'Azure Blob'},
  ],

  auth0: {
    clientID: '0CTDYjMaai14Stae3Is4vFj5lJOkd9bx',
    domain: 'datastrata.auth0.com',
    apiIdentifier: 'https://rest.datastrata.io',
    callbackUri: 'https://app.datastrata.io/public/callback',
    requestedScopes:  'openid profile email post:read post:write roles:read users:read ' +
      'users:write logs-tenant:read users-tenant:read users-tenant:write logs:read ' +
      'tenants:read tenants:write applications:read applications:write applications:delete',
    namespace: 'https://datastrata.io/'
  },

  stripe: {
    publishable_key: '',
    stripeRestServiceUrl: '/payments/webendpoints',
    purchaseableItems: {
      'one-day-purchase': {
        purchaseType: 'product',
        productData: [ {
          name: 'One Day',
          description: 'Single day access to Opinionated Stack',
          amount: 200,
          currency: 'usd',
          quantity: 1
        } ]
      },
      // the following items require synching with strip billing/subscriptions
      // Billing/subscriptions are configured on the Stripe Dashboard
      'daily-subscription': {
        purchaseType: 'subscription',
        productData: [ { plan: 'plan_FiZgAsjt8GzaEJ' } ]
      },
      'weekly-subscription': {
        purchaseType: 'subscription',
        productData: [ { plan: 'plan_FicEtYXSAxIDSU' } ]
      }
    }
  },

  restServiceURL: '/rest',
  restServiceWhitelistDomain: 'localhost',

  snackBarDuration: 2000,
  reloadDataDelay: 1500
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
