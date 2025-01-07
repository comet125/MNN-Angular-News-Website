import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-userpanel',
  templateUrl: './admin-userpanel.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./admin-userpanel.component.css']
})
export class AdminUserPanelComponent implements OnInit {
  users: any[] = [];
  apiUrl = 'http://localhost/database/admin.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch all users from the backend
  fetchUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.users = response.map(user => ({
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          surname: user.surname
        }));
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        alert('An error occurred while fetching users.');
      }
    });
  }


  editField(user: any, field: string) {
    const fieldMapping: { [key: string]: string } = {
      firstName: 'first_name',
      surname: 'surname',
      email: 'email',
      username: 'username'
    };

    const databaseField = fieldMapping[field] || field;
    const currentValue = user[field];
    const updatedValue = prompt(`Edit ${field.charAt(0).toUpperCase() + field.slice(1)} for ${user.username}`, currentValue);

    if (updatedValue !== null && updatedValue.trim() !== '') {
      this.http.put(this.apiUrl, { id: user.id, field: databaseField, value: updatedValue.trim() }).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            user[field] = updatedValue.trim();
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} for ${user.username} updated successfully!`);
          } else {
            alert(`Failed to update ${field}: ${response.message}`);
          }
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert(`Failed to update ${field}.`);
        }
      });
    }
  }


  // Delete a user
  deleteUser(userId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.http.delete(this.apiUrl, { body: { id: userId } }).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.users = this.users.filter(user => user.id !== userId);
            alert('User deleted successfully!');
          } else {
            alert(`Failed to delete user: ${response.message}`);
          }
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('An error occurred while deleting the user.');
        }
      });
    }
  }


}
