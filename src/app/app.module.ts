import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { AgmCoreModule } from '@agm/core'
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppBanner1Component } from './components/app-banner1/app-banner1.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { OfferSectionComponent } from './components/offer-section/offer-section.component';
import { AssistantComponent } from './components/assistant/assistant.component';
import { Assistant1Component } from './components/assistant1/assistant1.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetConfirmpasswordComponent } from './components/reset-confirmpassword/reset-confirmpassword.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AssistantTableComponent } from './components/assistant-table/assistant-table.component';
import { DisplayAssistantComponent } from './components/display-assistant/display-assistant.component';
import { EditAssistantComponent } from './components/edit-assistant/edit-assistant.component';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { TableDashboardUserComponent } from './components/table-dashboard-user/table-dashboard-user.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { EssaiComponent } from './components/essai/essai.component';
import { TableRequestsComponent } from './components/table-requests/table-requests.component';
import { MyfilterPipe } from './pipes/myfilter.pipe';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { MyfilterUserPipe } from './pipes/myfilter-user.pipe';
import { CallbackComponentComponent } from './components/callback-component/callback-component.component';
import { LoginWithGmailComponent } from './components/login-with-gmail/login-with-gmail.component';
import { SearchGenderComponent } from './components/search-gender/search-gender.component';
import { FloatPipe } from './pipes/float.pipe';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AppBanner1Component,
    HomeComponent,
    OfferSectionComponent,
    AssistantComponent,
    Assistant1Component,
    SignupComponent,
    LoginComponent,
    AssistantInfoComponent,
    ResetPasswordComponent,
    ResetConfirmpasswordComponent,
    ContactComponent,
    DashboardComponent,
    TableUserComponent,
    DashboardAssistantComponent,
    DashboardAdminComponent,
    UserInfoComponent,
    UserEditComponent,
    AssistantTableComponent,
    DisplayAssistantComponent,
    EditAssistantComponent,
    RequestTableComponent,
    TableDashboardUserComponent,
    ProfileUserComponent,
    EditProfileComponent,
    ProfileChangePasswordComponent,
    EssaiComponent,
    TableRequestsComponent,
    MyfilterPipe,
    SearchHomeComponent,
    AllAssistantsComponent,
    GoogleMapsComponent,
    MyfilterUserPipe,
    CallbackComponentComponent,
    LoginWithGmailComponent,
    SearchGenderComponent,
    FloatPipe,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDzC_bMuJ59kQaAvDQmSZxR1gtQpzjGr3E'
    // }),
  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
