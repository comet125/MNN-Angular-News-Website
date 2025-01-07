import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';


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

  private secretKey: string = 'sranje123';

  constructor(private router: Router, private http: HttpClient) {
    this.checkUserLoggedIn();
  }

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  checkUserLoggedIn() {
    const encryptedUsername = localStorage.getItem('username');
    const firstName = localStorage.getItem('first_name');
    const surname = localStorage.getItem('surname');

    if (encryptedUsername && firstName && surname) {
      const username = this.decrypt(encryptedUsername);
      // console.log('Decrypted username:', username);
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    const url = 'http://localhost/database/login.php';
    const formData = { email: this.email, password: this.password };

    this.http.post(url, formData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          // console.log('Login uspješan:', response);

          if (formData.email === 'admin' && formData.password === 'admin') {
            localStorage.setItem('role', 'admin');
            const encryptedUsername = this.encrypt('admin');
            localStorage.setItem('username', encryptedUsername);
            // console.log('Ulogovan kao: admin');
            this.router.navigate(['/admin-dash']);
          } else {
            localStorage.setItem('role', 'user');
            const encryptedUsername = this.encrypt(response.username);
            localStorage.setItem('username', encryptedUsername);
            localStorage.setItem('first_name', response.firstName);
            localStorage.setItem('surname', response.surname);
            // console.log('Ulogovan kao: user');
            this.router.navigate(['/home']);
          }
        } else {
          // console.warn('Neuspješan login:', response.message || 'Pogrešni podaci');
          alert(response.message || "Neuspješna prijava.");
        }
      },
      error: (error) => {
        // console.error('Greška prilikom prijave:', error);
        alert("Došlo je do greške. Pokušajte ponovo.");
      }
    });
  }
}
