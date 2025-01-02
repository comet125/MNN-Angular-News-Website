import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const hamburger = document.querySelector('.navbar-hamburger');
    if (hamburger) {
      if (this.menuOpen) {
        hamburger.classList.add('active');
      } else {
        hamburger.classList.remove('active');
      }
    }
  }
}
