import { inject, Injectable } from "@angular/core"
import { DiaryInfo } from "./diary-info"
@Injectable({
  providedIn:'root'
})
export class DiaryService{
  getAllDiaries(year:number,month:number): DiaryInfo[] {
    return this.diaryList.filter(diary=>(
      diary.date.getFullYear() == year && diary.date.getMonth() == month
    ));
  }
  getDiaryData(date: Date): DiaryInfo | undefined {
    return this.diaryList.find(diary => 
      diary.date.toDateString() === date.toDateString()
    );
  }
  addDiaryData(date: Date, title: string, content: string, tag: string[]) {
    const newDiary: DiaryInfo = { date, title, content, tag };
    this.diaryList.push(newDiary);
    console.log('new diary is saved:', newDiary);
  }
  

  private diaryList: DiaryInfo[] = [
    {
      date: new Date('2026-02-09'),
      title: 'My first Diary',
      content: 'First day of Angular Project.',
      tag: ['Angular', 'Study']
    },
    {
      date: new Date('2026-02-15'),
      title: 'Weather of Vancouver',
      content: 'Today is rainy. Vancouver is Raincouver',
      tag: ['Vancouver', 'Daily']
    },
    {
      date: new Date('2026-02-17'),
      title: 'Trying to use interface',
      content: 'Finally, I tried to use Interface for Diary data.',
      tag: ['Code', 'Success']
    }
  ];
}