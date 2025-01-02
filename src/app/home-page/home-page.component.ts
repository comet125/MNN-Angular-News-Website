import { Component } from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CalendarComponent} from '../calendar/calendar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    NewsCardComponent,
    NgForOf,
    CalendarComponent,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  calendarVisible = false;

  newsItems = [
    { title: 'News 1', content: 'This is the first news item.' },
    { title: 'News 2', content: 'This is the second news item.' },
    { title: 'News 3', content: 'This is the third news item.' },
    { title: 'News 4', content: 'This is the fourth news item.' },
    { title: 'News 5', content: 'This is the fifth news item.' },
  ];

  toggleCalendar() {
    this.calendarVisible = !this.calendarVisible;
  }
}
