import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateService } from '../date.service';
import { Diary } from '../diary/diary';
import { DiaryInfo } from '../diary-info';
import { DiaryService } from '../diary.service';
@Component({
  selector: 'app-monthly-diary',
  imports: [CommonModule,Diary],
  templateUrl: './monthly-diary.html',
  styleUrl: './monthly-diary.scss',
})
export class MonthlyDiary {
  // viewDate: Date = new Date();
  dateService:DateService = inject(DateService);
  diaryService:DiaryService = inject(DiaryService);
  
  selectedDiary: DiaryInfo | null = null;

  viewDate$ = this.dateService.viewDate$;

  diaryEdit:boolean = false;
  diaryList:DiaryInfo[] = [];
  
  ngOnInit() {
    this.getDiaries();
  }

  getDiaries() {
    const currentViewDate = this.dateService.getValue();
    let currentMonth = currentViewDate.getMonth();
    let currentYear = currentViewDate.getFullYear();

    this.diaryList = this.diaryService.getAllDiaries(currentYear,currentMonth);
  }

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
    this.getDiaries();
  }
  
  showDiaryEditer(diary :DiaryInfo){
    if (this.diaryEdit && this.selectedDiary?.date === diary.date) {
      this.diaryEdit = false;
      this.selectedDiary = null;
    } else {
      // 닫혀있거나 다른 날짜 클릭 → 열기 or 내용 교체
      this.diaryEdit = true;
      this.selectedDiary = diary;
    }

  }

}
