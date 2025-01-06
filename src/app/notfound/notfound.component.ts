import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  constructor(private router: Router) { }

  goHome() {
    const role = localStorage.getItem('role');
    if (role === 'user') {
      this.router.navigate(['/home']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin-dash']);
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
