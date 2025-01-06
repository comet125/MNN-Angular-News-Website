import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';
import {Router} from '@angular/router';
import { AdminUserPanelComponent } from '../admin-userpanel/admin-userpanel.component';
import {AdminUsercreateComponent} from '../admin-usercreate/admin-usercreate.component';
import {NewsCreationComponent} from '../news-creation/news-creation.component';
import {AdminNewspanelComponent} from '../admin-newspanel/admin-newspanel.component';

@Component({
  selector: 'app-admin-dash',
  imports: [
    NgClass,
    NgIf,
    FooterComponent,
    AdminUserPanelComponent,
    AdminUsercreateComponent,
    NewsCreationComponent,
    AdminNewspanelComponent
  ],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  userEditingVisible: boolean = false;
  newsEditingVisible: boolean = false;
  userCreationVisible: boolean = false;
  newsAddVisible: boolean = false;

  constructor(private router: Router,) {  }

  toggleUserEditing(): void {
    this.userEditingVisible = !this.userEditingVisible;
  }

  toggleNewsEditing(): void {
    this.newsEditingVisible = !this.newsEditingVisible;
  }

  toggleUserCreation(): void {
    this.userCreationVisible = !this.userCreationVisible;
  }

  toggleNewsAdd(): void {
    this.newsAddVisible = !this.newsAddVisible;
  }

  logout() {
    localStorage.removeItem('first_name');
    localStorage.removeItem('surname');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
