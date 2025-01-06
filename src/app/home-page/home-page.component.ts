import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { NewsService } from '../services/news.service';
import { Listing } from '../models/Listing';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NewsCardComponent} from '../news-card/news-card.component';
import {CalendarComponent} from '../calendar/calendar.component';
import { isPlatformBrowser } from '@angular/common';
import {NewsCreationComponent} from '../news-creation/news-creation.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    NgForOf,
    NgIf,
    NewsCardComponent,
    NgClass,
    CalendarComponent,
    NewsCreationComponent
  ],
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  calendarVisible = false;
  submitVisible = false;
  listingList: Listing[] = [];
  selectedNews: Listing | null = null;
  userName = localStorage.getItem('username');

  constructor(private newsService: NewsService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  toggleCalendar() {
    this.calendarVisible = !this.calendarVisible;
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe({
      next: (newsItems) => {
        this.listingList = newsItems.map(item => new Listing(
          item.title,
          item.image_url,
          item.description,
          item.tag,
          item.creation_date
        ));
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        alert('Failed to load news items.');
      }
    });
  }

  openModal(listing: Listing): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedNews = listing; // Set the selected news item
      const modalElement = document.getElementById('newsModal') as HTMLElement;

      if (modalElement) {
        import('bootstrap').then(({ Modal }) => {
          const modalInstance = new Modal(modalElement);
          modalInstance.show();
        });
      }
    }
  }

  toggleSubmit() {
    this.submitVisible = !this.submitVisible;
  }
}

