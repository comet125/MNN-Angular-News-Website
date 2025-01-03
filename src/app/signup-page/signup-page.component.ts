import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup-page',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  userData = {
    name: '',
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  async onSubmit() {
    if (!this.emailRegex.test(this.userData.email)) {
      alert('Invalid email format');
      return;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const hashedPassword = await bcrypt.hash(this.userData.password, 10);
    const formData = {
      username: this.userData.name,
      firstName: this.userData.firstName,
      surname: this.userData.surname,
      email: this.userData.email,
      password: hashedPassword
    };

    console.log(formData); // Log the data with the hashed password

    // Redirect after success
    alert("Account created successfully! Redirecting to the login page");
    this.router.navigate(['/login']);
  }
}
