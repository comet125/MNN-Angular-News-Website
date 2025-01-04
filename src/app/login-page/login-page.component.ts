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
    const url = 'http://localhost/database/login.php';
    const formData = { email: this.email, password: this.password };

    this.http.post(url, formData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          console.log('Login uspješan:', response);

          if (formData.email === 'admin' && formData.password === 'admin') {
            localStorage.setItem('role', 'admin'); // Postavi ulogu
            console.log('Ulogovan kao: admin');
            this.router.navigate(['/admin-dash']);

          } else {
            localStorage.setItem('role', 'user'); // Postavi ulogu
            console.log('Ulogovan kao: user');
            this.router.navigate(['/home']);
          }
        } else {
          console.warn('Neuspješan login:', response.message || 'Pogrešni podaci');
          alert(response.message || "Neuspješna prijava.");
        }
      },
      error: (error) => {
        console.error('Greška prilikom prijave:', error);
        alert("Došlo je do greške. Pokušajte ponovo.");
      }
    });
  }
}
