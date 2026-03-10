import { CommonModule } from '@angular/common';
import { Component,OnInit,EventEmitter,Output,inject,ChangeDetectorRef } from '@angular/core';
import { DateService } from '../date.service';
import { DiaryService } from '../diary.service';
import { DiaryInfo } from '../diary-info';
@Component({
  selector: 'app-calendar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})

export class Calendar implements OnInit {
  @Output() dateSelect = new EventEmitter<number>();
  @Output() diarySelect = new EventEmitter<DiaryInfo | null>();
  cdr = inject(ChangeDetectorRef);
  // viewDate: Date = new Date(); // today's date
  dateService = inject(DateService);
  diaryService = inject(DiaryService);

  viewDate$ = this.dateService.viewDate$;
  daysInMonth: number[] = [];  
  emptyDays: number[] = []; //empty date
  
  diaryDays: Set<number> = new Set(); 
  selectedDate:number = new Date().getDate();
  selectedMonth:number = new Date().getMonth();
  
  diaryList: DiaryInfo[] = [];

  ngOnInit() {
    const currentViewDate = this.dateService.getValue();
    this.generateCalendar(currentViewDate.getFullYear(), currentViewDate.getMonth());
  }
  clickChangeMonth(direct:number){
    const currentViewDate = this.dateService.getValue();
    let currentMonth = currentViewDate.getMonth();
    
    if(direct == 1){
      currentMonth -= 1;
    } else if(direct == 2) {
      currentMonth += 1;
    }
    // console.log(`${this.changeYear}, ${this.changeMonth}`);
    const nextDate = new Date(currentViewDate.getFullYear(),currentMonth);
    this.generateCalendar(nextDate.getFullYear(),nextDate.getMonth());
    this.dateService.updateDate(nextDate);
  }

  onDateClick(day:number){
    const currentViewDate = this.dateService.getValue();
    console.log('click the calendar : '+ day);
    this.dateSelect.emit(day);
    this.selectedDate = day;
    this.selectedMonth = currentViewDate.getMonth();
    const diary = this.diaryList.find(d =>
      new Date(d.date).getDate() === day
    ) ?? null;

    this.diarySelect.emit(diary);
  }
  isSelected(day:number):boolean{
    if(this.selectedDate != day) return false;
    else return true;
  }
  
  generateCalendar(year:number,month:number) {
    // check firstday of this month 
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    this.emptyDays = Array(firstDayOfMonth).fill(0);

    // lastday of this month
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: lastDateOfMonth }, (_, i) => i + 1);

    this.diaryService.getAllDiaries(year, month).subscribe(data => {
      console.log('calendar에서 호출 month:', month);
      this.diaryList = data;
      
      this.diaryDays = new Set(
        data.map(d => new Date(d.date).getDate())
      );
      this.cdr.detectChanges();
      const diary = this.diaryList.find(d =>
        new Date(d.date).getDate() === this.selectedDate
      ) ?? null;

      this.diarySelect.emit(diary);
      console.log(` calendar selected diary  : ${JSON.stringify(diary)}`);
    });

  }
  hasDiary(day: number): boolean {
    return this.diaryDays.has(day);
  }
}
