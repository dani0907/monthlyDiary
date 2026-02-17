import { CommonModule } from '@angular/common';
import { Component,OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  @Output() dateSelect = new EventEmitter<number>();
  viewDate: Date = new Date(); // 현재 보고 있는 날짜
  daysInMonth: number[] = [];  // 이번 달의 날짜들 (1, 2, 3...)
  emptyDays: number[] = [];    // 1일 시작 전 빈 칸들
  nowMonth = this.viewDate.getMonth();
  nowYear = this.viewDate.getFullYear();
  changeMonth:number = this.nowMonth;
  changeYear:number = this.nowYear;
  clickChangeMonth(direct:number){
    
    console.log(this.viewDate.getMonth());
    if(direct == 1){
      this.changeMonth -= 1;
    } else if(direct == 2) {
      this.changeMonth += 1;
    }
    console.log(`${this.changeYear}, ${this.changeMonth}`);
    this.generateCalendar(this.changeYear,this.changeMonth);
    this.viewDate = new Date(this.changeYear,this.changeMonth);
  }
  ngOnInit() {
    this.generateCalendar(this.nowYear, this.nowMonth);
  }
  onDateClick(day:number){
    console.log('click the calendar : '+ day);
    this.dateSelect.emit(day)
  }
  generateCalendar(year:number,month:number) {
    // const year = this.viewDate.getFullYear();
    // const month = this.viewDate.getMonth();

    // 1. 이번 달의 1일이 무슨 요일인지 (0: 일요일, 1: 월요일...)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    this.emptyDays = Array(firstDayOfMonth).fill(0);
    // console.log("firstDayOfMonth : " + firstDayOfMonth);
    // console.log("emptyDays : " + this.emptyDays);

    // 2. 이번 달의 마지막 날짜가 며칠인지
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    // console.log("lastDateOfMonth : "+ lastDateOfMonth);

    this.daysInMonth = Array.from({ length: lastDateOfMonth }, (_, i) => i + 1);
    // console.log("daysInMonth : " + this.daysInMonth);
  }
}
