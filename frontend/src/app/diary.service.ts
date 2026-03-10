import { inject, Injectable } from "@angular/core";
import { DiaryInfo } from "./diary-info";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class DiaryService{
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/diaries';
  
  getAllDiaries(year:number, month:number) : Observable<DiaryInfo[]>{
    return this.http.get<DiaryInfo[]>(
      `${this.apiUrl}/monthly?year=${year}&month=${month}`
    )
  }
  addDiaryData(diary: DiaryInfo): Observable<DiaryInfo> {
    return this.http.post<DiaryInfo>(this.apiUrl, diary);
  }
  deleteDiary(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  editDiary(id: string, diary:DiaryInfo):Observable<DiaryInfo>{
    return this.http.put<DiaryInfo>(
      `${this.apiUrl}/${id}`,
        diary
    );
  }

  // getAllDiaries(year:number,month:number): DiaryInfo[] {
  //   return this.diaryList.filter(diary=>(
  //     diary.date.getFullYear() == year && diary.date.getMonth() == month
  //   ));
  // }
  // getDiaryData(date: Date): DiaryInfo | undefined {
  //   return this.diaryList.find(diary => 
  //     diary.date.toDateString() === date.toDateString()
  //   );
  // }
  // addDiaryData(diary:DiaryInfo) {
  //   // const newDiary: DiaryInfo = { date, title, content, tag };
  //   this.diaryList.push(diary);
  //   console.log('new diary is saved:', diary);
  // }
  // getDiaryDaysInMonth(year: number, month: number): Set<number> {
  //   const days = this.diaryList
  //     .filter(d =>
  //       d.date.getFullYear() === year &&
  //       d.date.getMonth() === month
  //     )
  //     .map(d => d.date.getDate());
  //   return new Set(days);
  // }

  // private diaryList: DiaryInfo[] = [
  //   {
  //     date: new Date('2026-02-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-02-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-02-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-03-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-03-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-03-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-04-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-04-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-04-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-05-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-05-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-05-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-06-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-06-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-06-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-07-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-07-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-07-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-08-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-08-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-08-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   },
  //   {
  //     date: new Date('2026-09-09'),
  //     title: 'My first Diary',
  //     content: 'First day of Angular Project.',
  //     tag: ['Angular', 'Study']
  //   },
  //   {
  //     date: new Date('2026-09-15'),
  //     title: 'Weather of Vancouver',
  //     content: 'Today is rainy. Vancouver is Raincouver',
  //     tag: ['Vancouver', 'Daily']
  //   },
  //   {
  //     date: new Date('2026-09-17'),
  //     title: 'Trying to use interface',
  //     content: 'Finally, I tried to use Interface for Diary data.',
  //     tag: ['Code', 'Success']
  //   }
  // ];
}