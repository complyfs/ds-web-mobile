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
import { DateDisplayComponent } from './components/display-fields/date-display/date-display.component';
import { BooleanDisplayComponent } from './components/display-fields/boolean-display/boolean-display.component';
import { TextAreaDisplayComponent } from './components/display-fields/text-area-display/text-area-display.component';
import { TextFieldDisplayComponent } from './components/display-fields/text-field-display/text-field-display.component';
import { BrandedSpinnerComponent } from './components/branded-spinner/branded-spinner.component';
import { TenantsComponent } from './admin/tenants/tenants.component';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { ApplicationPanelComponent } from './components/application/application-panel/application-panel.component';
import { ApplicationDetailComponent } from './components/application/application-detail/application-detail.component';
import { ApplicationUsersComponent } from './components/application/application-users/application-users.component';
import { UserNameComponent } from './components/auth0/user-name/user-name.component';
import { ApplicationInfoComponent } from './components/application/application-info/application-info.component';
import { ApplicationContactsComponent } from './components/application/application-contacts/application-contacts.component';
import { ApplicationContactComponent } from './components/application/application-contact/application-contact.component';
import { ApplicationRestCredentialsComponent } from './components/application/application-rest-credentials/application-rest-credentials.component';
import { ProviderCredentialsComponent } from './admin/provider-credentials/provider-credentials.component';
import { SelectDisplayComponent } from './components/display-fields/select-display/select-display.component';
import { TestPageComponent } from './admin/test-page/test-page.component';
import { ProviderCredentialNameComponent } from './components/provider-credential-name/provider-credential-name.component';
import { ApplicationDashboardComponent } from './components/application/application-dashboard/application-dashboard.component';
import { VirtualBucketTickerComponent } from './components/application/virtual-bucket-ticker/virtual-bucket-ticker.component';
import { VirtualBucketsComponent } from './components/application/virtual-buckets/virtual-buckets.component';
import { ProviderEndpointsComponent } from './components/application/provider-endpoints/provider-endpoints.component';
import { BucketMonitoringComponent } from './admin/bucket-monitoring/bucket-monitoring.component';
import { BmListPanelComponent } from './components/bucket-monitor/bm-list-panel/bm-list-panel.component';
import { BmDetailComponent } from './components/bucket-monitor/bm-detail/bm-detail.component';

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
    DateDisplayComponent,
    BooleanDisplayComponent,
    TextAreaDisplayComponent,
    TextFieldDisplayComponent,
    BrandedSpinnerComponent,
    TenantsComponent,
    DialogTemplateComponent,
    ApplicationsComponent,
    ApplicationPanelComponent,
    ApplicationDetailComponent,
    ApplicationUsersComponent,
    UserNameComponent,
    ApplicationInfoComponent,
    ApplicationContactsComponent,
    ApplicationContactComponent,
    ApplicationRestCredentialsComponent,
    ProviderCredentialsComponent,
    SelectDisplayComponent,
    TestPageComponent,
    ProviderCredentialNameComponent,
    ApplicationDashboardComponent,
    VirtualBucketTickerComponent,
    VirtualBucketsComponent,
    ProviderEndpointsComponent,
    BucketMonitoringComponent,
    BmListPanelComponent,
    BmDetailComponent,
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
