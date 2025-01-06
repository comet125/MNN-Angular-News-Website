import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news-creation',
  imports: [
    FormsModule
  ],
  templateUrl: './news-creation.component.html',
  styleUrl: './news-creation.component.css'
})
export class NewsCreationComponent {
  title: string = '';
  imageUrl: string = '';
  description: string = '';
  username: string | null = localStorage.getItem('username');

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (!this.username) {
      alert('User not logged in. Please log in to add news.');
      return;
    }

    const newsData = {
      title: this.title,
      image_url: this.imageUrl,
      description: this.description,
      tag: this.username // Using the username as the tag
    };

    this.http.post('http://localhost/database/add-news.php', newsData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          alert('News added successfully!');
          // Optionally, clear the form
          this.title = '';
          this.imageUrl = '';
          this.description = '';
        } else {
          alert(`Failed to add news: ${response.message}`);
        }
      },
      error: (error) => {
        console.error('Error adding news:', error);
        alert('An error occurred while adding the news. Make sure the URL provided is valid.');
      }
    });
  }
}
