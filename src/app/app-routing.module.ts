import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetConfirmpasswordComponent } from './components/reset-confirmpassword/reset-confirmpassword.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DisplayAssistantComponent } from './components/display-assistant/display-assistant.component';
import { EditAssistantComponent } from './components/edit-assistant/edit-assistant.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { EssaiComponent } from './components/essai/essai.component';
import { AssistantTableComponent } from './components/assistant-table/assistant-table.component';
import { TableRequestsComponent } from './components/table-requests/table-requests.component';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { LoginWithGmailComponent } from './components/login-with-gmail/login-with-gmail.component';
import { SearchGenderComponent } from './components/search-gender/search-gender.component';


const routes: Routes = [ 
  {path:"",component:HomeComponent},
{path:"subscription",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
{path:"login",component:LoginComponent},
{path:"reset-password",component:ResetPasswordComponent},
{path:"reset-confirmpassword",component:ResetConfirmpasswordComponent},
{path:"assistant-info/:id",component:AssistantInfoComponent},
{path:"contact/:id",component:ContactComponent},
{path:"dashboard",component:DashboardComponent},
{path:"table-user",component:TableUserComponent},
{path:"user-info/:id",component:UserInfoComponent},
{path:"user-edit/:id",component:UserEditComponent},
{path:"display-assistant/:id",component:DisplayAssistantComponent},
{path:"edit-assistant/:id",component:EditAssistantComponent},
{path:"dashboard-assistant",component:DashboardAssistantComponent},
{path:"dashboard-admin",component:DashboardAdminComponent},
{path:"profile-user",component:ProfileUserComponent},
{path:"edit-profile",component:EditProfileComponent},
{path:"profile-changhe-password",component:ProfileChangePasswordComponent},
{path:"essai",component:EssaiComponent},
{path:"assistant-table",component:AssistantTableComponent},
{path:"table-user",component:TableUserComponent},
{path:"table-requests",component:TableRequestsComponent},
{path:"search-home/:term",component:SearchHomeComponent},
{path:"all-assistants",component:AllAssistantsComponent},
{path:"google-maps",component:GoogleMapsComponent},
{path:"login-with-gmail",component:LoginWithGmailComponent},
{path:"search-gender/:term",component:SearchGenderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
