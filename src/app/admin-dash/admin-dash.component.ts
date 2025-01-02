import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  imports: [
    NgClass,
    NgIf,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  userEditingVisible: boolean = false;
  newsEditingVisible: boolean = false;

  toggleUserEditing(): void {
    this.userEditingVisible = !this.userEditingVisible;
  }

  toggleNewsEditing(): void {
    this.newsEditingVisible = !this.newsEditingVisible;
  }
}
