import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  years: number[] = [];
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  dates: { day: number; fullDate: string }[] = [];
  newsDates: string[] = ['2025-01-15', '2025-01-20', '2025-02-10']; // Sample news dates

  ngOnInit() {
    this.initializeYears();
    this.updateCalendar();
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

    // Add padding for days of the week before the 1st
    for (let i = 0; i < firstDay; i++) {
      this.dates.push({ day: 0, fullDate: '' });
    }

    // Add actual days of the month
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
      console.log(`Selected date: ${date}`);
      // Placeholder for filtering news by the selected date
    }
  }
}
