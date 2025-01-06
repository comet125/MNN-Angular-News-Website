import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-usercreate',
  imports: [
    FormsModule
  ],
  templateUrl: './admin-usercreate.component.html',
  styleUrl: './admin-usercreate.component.css'
})
export class AdminUsercreateComponent {
  userData = {
    name: '',
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

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

    //const hashedPassword = await bcrypt.hash(this.userData.password, 10);

    const formData = {
      username: this.userData.name,
      first_name: this.userData.firstName,
      surname: this.userData.surname,
      email: this.userData.email,
      password: this.userData.password
    };

    console.log(formData);

    const url = 'http://localhost/database/register.php';

    this.http.post(url, formData).subscribe({
      next: (response: any) => {
        console.log('Uspjeh:', response);
        alert("Account created successfully.");
      },
      error: (error) => {
        console.log(formData);
        console.error('Error:', error);
      }
    });

  }
}
