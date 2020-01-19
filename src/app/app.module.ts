import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialIoModule } from './material-io.module';
import { HomeComponent } from './public/home/home.component';
import { PublicRootComponent } from './public/public-root/public-root.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { PrivateRootComponent } from './private/private-root/private-root.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { LoginRequiredDialogComponent } from './guards/login-required-dialog/login-required-dialog.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './public/callback/callback.component';

import { ProfileComponent } from './private/profile/profile.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { Auth0UsersComponent } from './admin/auth0-users/auth0-users.component';
import { AdminRootComponent } from './admin/admin-root/admin-root.component';
import { LoginErrorComponent } from './public/login-error/login-error.component';
import { Auth0RolesComponent } from './admin/auth0-roles/auth0-roles.component';

import { AccountComponent } from './private/account/account.component';
import { SidebarDividerComponent } from './components/sidebar-divider/sidebar-divider.component';
import { DemoRestCallComponent } from './components/demo-rest-call/demo-rest-call.component';
import { BasicSubscriberComponent } from './private/basic-subscriber/basic-subscriber.component';
import { PremiumSubscriberComponent } from './private/premium-subscriber/premium-subscriber.component';
import { LogsComponent } from './admin/logs/logs.component';
import { TenantsComponent } from './admin/tenants/tenants.component';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { TextFieldComponent } from './components/field-display/text-field/text-field.component';
import { TextAreaComponent } from './components/field-display/text-area/text-area.component';
import { ApplicationPanelComponent } from './components/application/application-panel/application-panel.component';
import { ApplicationDetailComponent } from './components/application/application-detail/application-detail.component';
import { ApplicationUsersComponent } from './components/application/application-users/application-users.component';
import { ApplicationDataStoresComponent } from './components/application/application-data-stores/application-data-stores.component';
import { CredentialsComponent } from './admin/credentials/credentials.component';
import { UserNameComponent } from './components/auth0/user-name/user-name.component';
import { BooleanComponent } from './components/field-display/boolean/boolean.component';
import { ApplicationDataEndpointsComponent } from './components/application/application-data-endpoints/application-data-endpoints.component';
import { CredentialNameComponent } from './components/credential-name/credential-name.component';
import { ApplicationInfoComponent } from './components/application/application-info/application-info.component';
import { ApplicationContactsComponent } from './components/application/application-contacts/application-contacts.component';
import { ApplicationCredentialsComponent } from './components/application/application-credentials/application-credentials.component';
import { ApplicationContactComponent } from './components/application/application-contact/application-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicRootComponent,
    ContactUsComponent,
    PrivateRootComponent,
    DashboardComponent,
    LoginRequiredDialogComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    ProfileComponent,
    SidebarMenuComponent,
    Auth0UsersComponent,
    AdminRootComponent,
    LoginErrorComponent,
    Auth0RolesComponent,
    AccountComponent,
    SidebarDividerComponent,
    DemoRestCallComponent,
    BasicSubscriberComponent,
    PremiumSubscriberComponent,
    LogsComponent,
    TenantsComponent,
    DialogTemplateComponent,
    ApplicationsComponent,
    TextFieldComponent,
    TextAreaComponent,
    ApplicationPanelComponent,
    ApplicationDetailComponent,
    ApplicationUsersComponent,
    ApplicationDataStoresComponent,
    CredentialsComponent,
    UserNameComponent,
    BooleanComponent,
    ApplicationDataEndpointsComponent,
    CredentialNameComponent,
    ApplicationInfoComponent,
    ApplicationContactsComponent,
    ApplicationCredentialsComponent,
    ApplicationContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialIoModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginRequiredDialogComponent
  ]
})
export class AppModule { }
