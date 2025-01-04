import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit() {
    // Check if the entered email and password match the admin credentials
    if (this.email === 'admin' && this.password === 'admin') {
      alert("Administrator login success");
      this.router.navigate(['/admin-dash']);
    } else {
      const url = 'http://localhost/database/login.php';

      const formData = {
        email: this.email,
        password: this.password
      };

      this.http.post(url, formData, {
        headers: {
          'Content-Type': 'application/json'  // Ensure content-type is JSON
        }
      }).subscribe({
        next: (response: any) => {
          console.log('Uspjeh:', response);

          if (response.status === 'success') {
            // Redirect only if login is successful
            this.router.navigate(['/home']);
          } else {
            // Show error if login fails (user not found or incorrect password)
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Greška:', error);
        }
      });
    }
  }
}
