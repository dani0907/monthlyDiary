import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateService } from '../date.service';
@Component({
  selector: 'app-monthly-diary',
  imports: [CommonModule],
  templateUrl: './monthly-diary.html',
  styleUrl: './monthly-diary.scss',
})
export class MonthlyDiary {
  // viewDate: Date = new Date();
  dateService:DateService = inject(DateService)
  viewDate$ = this.dateService.viewDate$;
  // nowMonth = this.viewDate$.getMonth();
  // nowYear = this.viewDate$.getFullYear();

  clickChangeMonth(direct:number){
    const currentViewDate = this.dateService.getValue();
    let currentMonth = currentViewDate.getMonth();
    // console.log("monthly diary :: "+this.viewDate.getMonth());
    if(direct == 1){
      currentMonth -= 1;
    } else if(direct == 2) {
      currentMonth += 1;
    }
    const nextDate = new Date(currentViewDate.getFullYear(), currentMonth, 1);
  
    this.dateService.updateDate(nextDate);
  }

}
