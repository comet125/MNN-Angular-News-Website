import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Listing } from '../models/Listing';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NewsCardComponent} from '../news-card/news-card.component';
import {CalendarComponent} from '../calendar/calendar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    NgForOf,
    NgIf,
    NewsCardComponent,
    NgClass,
    CalendarComponent,
    RouterLink
  ],
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  calendarVisible = false;

  toggleCalendar() {
    this.calendarVisible = !this.calendarVisible;
  }

  listingList: Listing[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe({
      next: (newsItems) => {
        console.log(JSON.stringify(newsItems, null, 2));
        // Corrected mapping to match API response
        this.listingList = newsItems.map(item => new Listing(
          item.title,            // Use 'title' from API
          item.image_url,        // Use 'image_url' from API
          item.description,      // Use 'description' from API
          item.tag,
          item.creation_date    // Use 'creation_date' from API
        ));
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        alert('Failed to load news items.');
      }
    });
  }
}

