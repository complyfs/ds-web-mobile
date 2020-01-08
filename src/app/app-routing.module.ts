import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PublicRootComponent } from './public/public-root/public-root.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { PrivateRootComponent } from './private/private-root/private-root.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { AuthorizedGuard } from './guards/authorized/authorized.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { CallbackComponent } from './public/callback/callback.component';
import { ProfileComponent } from './private/profile/profile.component';
import { AdminRootComponent } from './admin/admin-root/admin-root.component';
import { Auth0UsersComponent } from './admin/auth0-users/auth0-users.component';
import { LoginErrorComponent } from './public/login-error/login-error.component';
import { SignupComponent } from './private/subscribe/signup/signup.component';
import { StripeThanksComponent } from './private/subscribe/stripe-thanks/stripe-thanks.component';
import { StripeCancelComponent } from './private/subscribe/stripe-cancel/stripe-cancel.component';
import { AccountComponent } from './private/account/account.component';
import { Auth0RolesComponent } from './admin/auth0-roles/auth0-roles.component';
import { BasicSubscriberComponent } from './private/basic-subscriber/basic-subscriber.component';
import { PremiumSubscriberComponent } from './private/premium-subscriber/premium-subscriber.component';
import { BillingComponent } from './private/billing/billing.component';
import { LogsComponent } from './admin/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: '/private', pathMatch: 'full' },
  { path: 'public', component: PublicRootComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'loginerror/:errorType', component: LoginErrorComponent }
    ]
  },
  {
    path: 'private', component: PrivateRootComponent, canActivate: [AuthenticatedGuard], canActivateChild: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
/*      { path: 'basicsub', component: BasicSubscriberComponent },
      { path: 'premsub', component: PremiumSubscriberComponent },
      { path: 'account', component: AccountComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'signupthanks', component: StripeThanksComponent },
      { path: 'signupcancel', component: StripeCancelComponent }*/
    ]
  },
  {
    path: 'superadmin', component: AdminRootComponent,  canActivate: [AuthorizedGuard], canActivateChild: [AuthorizedGuard], data: {expectedRoles: ['Admin']},
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: Auth0UsersComponent, data: {expectedRoles: ['Admin']} },
      { path: 'roles', component: Auth0RolesComponent, data: {expectedRoles: ['Admin']} },
      { path: 'logs', component: LogsComponent, data: {expectedRoles: ['Admin']} }
    ]
  },
  {
    path: 'admin', component: AdminRootComponent,  canActivate: [AuthorizedGuard], canActivateChild: [AuthorizedGuard], data: {expectedRoles: ['Tenant Admin']},
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: Auth0UsersComponent, data: {expectedRoles: ['Admin']} },
      { path: 'roles', component: Auth0RolesComponent, data: {expectedRoles: ['Admin']} },
      { path: 'logs', component: LogsComponent, data: {expectedRoles: ['Admin']} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ]
})
export class AppRoutingModule { }
