import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-newspanel',
  imports: [
    NgForOf
  ],
  templateUrl: './admin-newspanel.component.html',
  styleUrl: './admin-newspanel.component.css'
})
export class AdminNewspanelComponent {
  news: any[] = []; // Array to hold the news data
  apiUrl = 'http://localhost/database'; // Adjust your API URL accordingly

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews(); // Fetch the news when the component initializes
  }

  // Fetch all news listings
  fetchNews(): void {
    this.http.get(`${this.apiUrl}/admin-getnews.php`).subscribe(
      (response: any) => {
        this.news = response.data; // Assuming the PHP returns a "data" field with the news
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  // Edit a specific field for a news item
  editField(newsItem: any, field: string): void {
    const newValue = prompt(`Enter new value for ${field}:`, newsItem[field]);
    if (newValue !== null && newValue.trim() !== '') {
      const updatedData = {
        id: newsItem.id,
        field,
        value: newValue,
        updateTag: true, // Send a flag to update the tag field
      };

      this.http.put(`${this.apiUrl}/update-news.php`, updatedData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('Field updated successfully!');
            this.fetchNews(); // Refresh the table after the update
          } else {
            alert(`Failed to update field: ${response.message}`);
          }
        },
        (error) => {
          console.error('Error updating field:', error);
        }
      );
    }
  }


  // Delete a news item by ID
// Delete a news item by ID
  deleteUser(newsId: number): void {
    if (confirm('Are you sure you want to delete this news item?')) {
      this.http.delete(`${this.apiUrl}/delete-news.php`, {
        headers: { 'Content-Type': 'application/json' },
        body: { id: newsId }, // Send the ID in the body
      }).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('News item deleted successfully!');
            this.fetchNews(); // Refresh the table after deletion
          } else {
            alert(`Failed to delete news: ${response.message}`);
          }
        },
        (error) => {
          console.error('Error deleting news item:', error);
          alert('Failed to delete the news item.');
        }
      );
    }
  }
}
