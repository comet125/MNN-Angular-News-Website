import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NewsService} from '../services/news.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf,
    FormsModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  newsData: any[] = [];

  constructor(private newsService: NewsService, private http: HttpClient) {}

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  years: number[] = [];
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  dates: { day: number; fullDate: string }[] = [];
  newsDates: string[] = [];

  ngOnInit() {
    this.initializeYears();
    this.updateCalendar();
    this.fetchNewsDates();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  updateCalendar() {
    this.dates = [];
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      this.dates.push({ day: 0, fullDate: '' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      this.dates.push({ day: i, fullDate });
    }
  }

  prevMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.updateCalendar();
  }

  selectDate(date: string) {
    if (date) {
      // console.log(`Selected date: ${date}`);
      this.newsService.getNewsByDate(date).subscribe((news) => {
        this.newsData = news;
        // console.log('Filtered News:', this.newsData);
      }, error => {
        // console.error('Error fetching news:', error);
      });
    }
  }

  fetchNewsDates() {
    this.http.get<{ status: string, data: string[] }>('http://localhost/database/get-news.php')
      .subscribe(response => {
        if (response.status === 'success') {
          this.newsDates = response.data;
          // console.log('Fetched news dates:', this.newsDates);
        } else {
          // console.error('Failed to fetch news dates');
        }
      }, error => {
        // console.error('Error fetching news dates:', error);
      });
  }
}
