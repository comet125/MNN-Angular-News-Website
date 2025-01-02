import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }  // Inject the router

  onSubmit() {
    // Check if the entered email and password match the admin credentials
    if (this.email === 'admin' && this.password === 'admin') {
      alert("Administrator login success");
      this.router.navigate(['/admin-dash']);
    }
  }
}
