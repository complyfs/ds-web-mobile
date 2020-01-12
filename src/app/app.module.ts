import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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

import { SignupComponent } from './private/subscribe/signup/signup.component';
import { StripeThanksComponent } from './private/subscribe/stripe-thanks/stripe-thanks.component';
import { StripeCancelComponent } from './private/subscribe/stripe-cancel/stripe-cancel.component';
import { AccountComponent } from './private/account/account.component';
import { SidebarDividerComponent } from './components/sidebar-divider/sidebar-divider.component';
import { PaymentHistoryComponent } from './components/payments/payment-history/payment-history.component';
import { SubscriptionHistoryComponent } from './components/payments/subscription-history/subscription-history.component';
import { StripeSessionComponent } from './components/payments/stripe-session/stripe-session.component';
import { DemoRestCallComponent } from './components/demo-rest-call/demo-rest-call.component';
import { SubscriptionDetailComponent } from './components/payments/subscription-detail/subscription-detail.component';
import { PlanDetailComponent } from './components/payments/plan-detail/plan-detail.component';
import { ProductDetailComponent } from './components/payments/product-detail/product-detail.component';
import { CustomerDetailComponent } from './components/payments/customer-detail/customer-detail.component';
import { InvoiceHistoryComponent } from './components/payments/invoice-history/invoice-history.component';
import { BasicSubscriberComponent } from './private/basic-subscriber/basic-subscriber.component';
import { PremiumSubscriberComponent } from './private/premium-subscriber/premium-subscriber.component';
import { BillingComponent } from './private/billing/billing.component';
import { LogsComponent } from './admin/logs/logs.component';
import { DateDisplayComponent } from './components/display-fields/date-display/date-display.component';
import { BooleanDisplayComponent } from './components/display-fields/boolean-display/boolean-display.component';
import { TextAreaDisplayComponent } from './components/display-fields/text-area-display/text-area-display.component';
import { TextFieldDisplayComponent } from './components/display-fields/text-field-display/text-field-display.component';
import { TenantsComponent } from './admin/tenants/tenants.component';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import { ApplicationsComponent } from './admin/applications/applications.component';

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
    SignupComponent,
    StripeThanksComponent,
    StripeCancelComponent,
    AccountComponent,
    SidebarDividerComponent,
    PaymentHistoryComponent,
    SubscriptionHistoryComponent,
    StripeSessionComponent,
    DemoRestCallComponent,
    SubscriptionDetailComponent,
    PlanDetailComponent,
    ProductDetailComponent,
    CustomerDetailComponent,
    InvoiceHistoryComponent,
    BasicSubscriberComponent,
    PremiumSubscriberComponent,
    BillingComponent,
    LogsComponent,
    DateDisplayComponent,
    BooleanDisplayComponent,
    TextAreaDisplayComponent,
    TextFieldDisplayComponent,
    TenantsComponent,
    DialogTemplateComponent,
    ApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialIoModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginRequiredDialogComponent
  ]
})
export class AppModule { }
