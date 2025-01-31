import {provideRouter, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactComponent } from './contact/contact.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { NewsCreationComponent } from './news-creation/news-creation.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GuestComponent } from './guest/guest.component';
import {provideHttpClient} from '@angular/common/http';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  { path: '', component: GuestComponent }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], data: {roles: 'user'} },
  { path: 'profile', component: ProfileSettingsComponent, canActivate: [AuthGuard], data: {role: 'user'} },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-dash', component: AdminDashComponent, canActivate: [AuthGuard], data: { role:'admin' } },
  { path: 'submit', component: NewsCreationComponent},
  { path: 'landing', component: GuestComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
