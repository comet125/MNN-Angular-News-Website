import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactComponent } from './contact/contact.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileSettingsComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-dash', component: AdminDashComponent },
];

