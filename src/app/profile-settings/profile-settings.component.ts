import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-profile-settings',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})


export class ProfileSettingsComponent implements OnInit {
  firstName: string = '';
  surname: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';


  constructor(private router: Router) { }




  // Function to check if the new passwords match
  formValid(): boolean {
    return this.newPassword === this.confirmPassword;
  }


  // Function to handle form submission
  firstname: string | null | undefined;
  lastname: string | null | undefined;
  username: string | null | undefined;

  ngOnInit() {
    this.firstname = localStorage.getItem('first_name');
    this.lastname = localStorage.getItem('surname');
    this.username = localStorage.getItem('username');
  }

  onSubmit(): void {
    if (!this.formValid()) {
      // If passwords don't match, show an alert
      alert('New passwords do not match. Please try again.');
      return;
    }

    // Process the form submission here
    // For now, just print the values to console
    console.log('Profile updated:', {
      firstName: this.firstName,
      surname: this.surname,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });

    // Here, you can add any service to update user profile data, etc.
  }
}
