import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

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
  username: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Decrypt the username if it exists in localStorage
    const encryptedUsername = localStorage.getItem('username');
    if (encryptedUsername) {
      const bytes = CryptoJS.AES.decrypt(encryptedUsername, 'sranje123');
      this.username = bytes.toString(CryptoJS.enc.Utf8); // Decrypted username
    }
  }

  onSubmit(): void {
    if (!this.username) {
      alert('User not logged in. Please log in to add news.');
      return;
    }

    // Check if the image URL is empty, if so, set the placeholder URL
    if (!this.imageUrl) {
      this.imageUrl = 'https://placehold.co/800x600/6a11cb/FFF?text=Breaking+news';
    }

    const newsData = {
      title: this.title,
      image_url: this.imageUrl,
      description: this.description,
      tag: this.username // Using the decrypted username as the tag
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

