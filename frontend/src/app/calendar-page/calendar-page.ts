import { Component, inject, Input, ViewChild } from '@angular/core';
import { Calendar } from '../calendar/calendar';
import { Diary } from '../diary/diary';
import { DiaryInfo } from '../diary-info';
import { DateService } from '../date.service';
@Component({
  selector: 'app-calendar-page',
  imports: [Calendar, Diary],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
})
export class CalendarPage {
  @ViewChild(Calendar) calendarRef!: Calendar; 
  dateService = inject(DateService);
  
  onSaveDiary() {
    this.calendarRef.generateCalendar( // 캘린더 함수 직접 호출!
      this.dateService.getValue().getFullYear(),
      this.dateService.getValue().getMonth()
    );
  }
  selectedDay:number | null = null;
  handleDateChange(day:number){
    this.selectedDay = day;
    console.log("calendar-page selectedDay :: " + this.selectedDay);
  }
  selectedDiary: DiaryInfo | null = null;
  onDiarySelect(diary: DiaryInfo | null) {
    this.selectedDiary = diary;
  }
}
