import { CommonModule } from '@angular/common';
import { Component,OnInit,EventEmitter,Output,inject } from '@angular/core';
import { DateService } from '../date.service';
@Component({
  selector: 'app-calendar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})

export class Calendar implements OnInit {
  @Output() dateSelect = new EventEmitter<number>();
  // viewDate: Date = new Date(); // today's date
  dateService = inject(DateService)
  viewDate$ = this.dateService.viewDate$;
  daysInMonth: number[] = [];  
  emptyDays: number[] = []; //empty date
  // nowMonth = this.viewDate.getMonth();
  // nowYear = this.viewDate.getFullYear();

  selectedDate:number = new Date().getDate();
  selectedMonth:number = new Date().getMonth();
  
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
    this.generateCalendar(currentViewDate.getFullYear(),currentMonth);
    const nextDate = new Date(currentViewDate.getFullYear(),currentMonth);
    this.dateService.updateDate(nextDate);
  }

  onDateClick(day:number){
    const currentViewDate = this.dateService.getValue();
    console.log('click the calendar : '+ day);
    this.dateSelect.emit(day);
    this.selectedDate = day;
    this.selectedMonth = currentViewDate.getMonth();
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
  }
}
