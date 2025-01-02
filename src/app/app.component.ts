import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, FooterComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectChallenge2';
  constructor(private router: Router) {}

  shouldShowLayout(): boolean {
    const excludedRoutes = ['/', '/signup', '/login', '/admin-dash'];
    return !excludedRoutes.includes(this.router.url);
  }
}
