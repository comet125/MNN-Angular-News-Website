import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-profile-settings',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})


export class ProfileSettingsComponent implements OnInit {
  permanentFirstName: string | null = '';
  permanentSurname: string | null = '';

  firstName: string = '';
  surname: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  username: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('surname');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const encryptedUsername = localStorage.getItem('username');
    if (encryptedUsername) {
      const bytes = CryptoJS.AES.decrypt(encryptedUsername, 'sranje123');
      this.username = bytes.toString(CryptoJS.enc.Utf8);
    }

    this.permanentFirstName = localStorage.getItem('first_name');
    this.permanentSurname = localStorage.getItem('surname');

    this.firstName = localStorage.getItem('first_name') || '';
    this.surname = localStorage.getItem('surname') || '';

    if (!this.username) {
      alert('Session timed out. Please log out and log back in again');
    }
  }


  formValid(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  onSubmit(): void {
    if (!this.formValid()) {
      alert('New passwords do not match. Please try again.');
      return;
    }

    if (!this.firstName || !this.surname || !this.oldPassword || !this.newPassword) {
      alert('All fields are required.');
      return;
    }

    const updatedProfile = {
      username: this.username,
      first_name: this.firstName,
      surname: this.surname,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };

    this.http.post<any>('http://localhost/database/editprofile.php', updatedProfile).subscribe(
      response => {
        if (response.status === 'success') {
          alert('Profile updated successfully.');
          localStorage.setItem('first_name', this.firstName);
          localStorage.setItem('surname', this.surname);
        } else {
          alert(response.message);
        }
      },
      error => {
        alert('An error occurred while updating the profile. Please check if the old password is correct.');
        // console.error(error);
      }
    );
  }
}


