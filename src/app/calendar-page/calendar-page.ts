import { Component, Input } from '@angular/core';
import { Calendar } from '../calendar/calendar';
import { Diary } from '../diary/diary';

@Component({
  selector: 'app-calendar-page',
  imports: [Calendar, Diary],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
})
export class CalendarPage {
  selectedDay:number | null = null;
  handleDateChange(day:number){
    this.selectedDay = day;
  }
}
