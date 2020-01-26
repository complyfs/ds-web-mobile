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
import { Auth0RolesComponent } from './admin/auth0-roles/auth0-roles.component';
import { LogsComponent } from './admin/logs/logs.component';
import { TenantsComponent } from './admin/tenants/tenants.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { ProviderCredentialsComponent } from './admin/provider-credentials/provider-credentials.component';
import {TestPageComponent} from "./admin/test-page/test-page.component";

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
      { path: 'applications', component: ApplicationsComponent },
      { path: 'credentials', component: ProviderCredentialsComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  {
    path: 'superadmin', component: AdminRootComponent,  canActivate: [AuthorizedGuard], canActivateChild: [AuthorizedGuard], data: {expectedRoles: ['Admin']},
    children: [
      { path: 'tenants', component: TenantsComponent, data: {expectedRoles: ['Admin']} }
    ]
  },
  {
    path: 'admin', component: AdminRootComponent,  canActivate: [AuthorizedGuard], canActivateChild: [AuthorizedGuard], data: {expectedRoles: ['Tenant Admin']},
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: Auth0UsersComponent, data: {expectedRoles: ['Admin', 'Tenant Admin']} },
      { path: 'roles', component: Auth0RolesComponent, data: {expectedRoles: ['Admin', 'Tenant Admin']} },
      { path: 'logs', component: LogsComponent, data: {expectedRoles: ['Admin', 'Tenant Admin']} },
      { path: 'test', component: TestPageComponent, data: {expectedRoles: ['Admin', 'Tenant Admin']} },
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
