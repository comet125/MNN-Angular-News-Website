import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {isPlatformBrowser, NgForOf } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Listing} from '../models/Listing';
import {NewsService} from '../services/news.service';

@Component({
  selector: 'app-guest',
  imports: [
    NewsCardComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent implements OnInit {
  calendarVisible = false;
  listingList: Listing[] = [];
  selectedNews: Listing | null = null;

  constructor(private newsService: NewsService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    // Check if 'role' exists in localStorage
    const role = localStorage.getItem('role');

    if (role) {
      // If a role is found, navigate to /home
      this.router.navigate(['/home']);
    }
  }

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


  menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const hamburger = document.querySelector('.navbar-hamburger');
    if (hamburger) {
      if (this.menuOpen) {
        hamburger.classList.add('active');
      } else {
        hamburger.classList.remove('active');
      }
    }
  }
}
