import { Component, inject,ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateService } from '../date.service';
import { Diary } from '../diary/diary';
import { DiaryInfo } from '../diary-info';
import { DiaryService } from '../diary.service';
import { Observable } from 'rxjs';
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
  cdr = inject(ChangeDetectorRef);
  
  selectedDiary: DiaryInfo | null = null;

  viewDate$ = this.dateService.viewDate$;

  diaryEdit:boolean = false;
  // diaryList:DiaryInfo[] = [];
  diaryList$!: Observable<DiaryInfo[]>; 
  
  ngOnInit() {
    this.getDiaries();
  }

  getDiaries(year?: number, month?: number) {
    const currentViewDate = this.dateService.getValue();
    let currentMonth = month??currentViewDate.getMonth();
    let currentYear = year??currentViewDate.getFullYear();
    
    console.log(`getDiaries getMonth: ${currentMonth}`)
    // this.diaryService.getAllDiaries(currentYear, currentMonth)
    // .subscribe(data => {
    //   this.diaryList = [];
    //   console.log(`getAllDiaries data : ${JSON.stringify(data)}`);
    //   this.diaryList = data;
    //   this.cdr.detectChanges();
    //   console.log('diaryList 업데이트 후:', this.diaryList); // 추가
    // });
    // console.log(`this.diaryList : ${JSON.stringify(this.diaryList)}`);
    this.diaryList$ = this.diaryService.getAllDiaries(currentYear, currentMonth);
  }

  clickChangeMonth(direct:number){
    const currentViewDate = this.dateService.getValue();
    let currentMonth = currentViewDate.getMonth();
    if(direct == 1){
      currentMonth -= 1;
    } else if(direct == 2) {
      currentMonth += 1;
    }
    const nextDate = new Date(currentViewDate.getFullYear(), currentMonth, 1);
    this.dateService.updateDate(nextDate);
    this.getDiaries(nextDate.getFullYear(), nextDate.getMonth());
  }
  
  showDiaryEditer(diary :DiaryInfo){
    if (this.diaryEdit && this.selectedDiary?.date === diary.date) {
      this.diaryEdit = false;
      this.selectedDiary = null;
    } else {
      this.diaryEdit = true;
      this.selectedDiary = diary;
    }

  }
  onSaveDiary(){
    console.log(`**onSaveDiary start**`);
    this.getDiaries();
  }

}
