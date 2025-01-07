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
  news: any[] = [];
  apiUrl = 'http://localhost/database';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.http.get(`${this.apiUrl}/admin-getnews.php`).subscribe(
      (response: any) => {
        this.news = response.data;
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  editField(newsItem: any, field: string): void {
    const newValue = prompt(`Enter new value for ${field}:`, newsItem[field]);
    if (newValue !== null && newValue.trim() !== '') {
      const updatedData = {
        id: newsItem.id,
        field,
        value: newValue,
        updateTag: true,
      };

      this.http.put(`${this.apiUrl}/update-news.php`, updatedData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('Field updated successfully!');
            this.fetchNews();
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

  deleteUser(newsId: number): void {
    if (confirm('Are you sure you want to delete this news item?')) {
      this.http.delete(`${this.apiUrl}/delete-news.php`, {
        headers: { 'Content-Type': 'application/json' },
        body: { id: newsId },
      }).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('News item deleted successfully!');
            this.fetchNews();
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
