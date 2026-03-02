import { Component,Input,Output,EventEmitter,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiaryInfo } from '../diary-info';
import { DiaryService } from '../diary.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-diary',
  imports: [CommonModule,FormsModule],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class Diary {
  @Input() day:number|null=null;
  @Input() diary: DiaryInfo | null = null;
  
  diaryService = inject(DiaryService);
  dateService = inject(DateService);

  tags: string[] = [];
  tagInput: string = '';
  diaryTitle:string='';
  diaryContent:string='';
  diaryDate:Date = new Date();

  currentDate = this.dateService.getValue();


  ngOnChanges() {
    // diary 바뀔 때마다 태그 초기화
    this.tags = this.diary?.tag ? [...this.diary.tag] : [];
    this.diaryTitle = this.diary?.title ?? '';
    this.diaryContent = this.diary?.content ?? '';
    this.diaryDate = this.diary?.date ?? (
      this.day !== null
      ? new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.day)
      : new Date() 
    );
  }

  onTagKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.isComposing) return;
    if (event.key === 'Enter' && this.tagInput.trim()) {
      event.preventDefault();
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }
  addDiaryFunction(){
    const date = this.dateService.getValue();
    
    const inputDiaryData : DiaryInfo = {
      date : this.diaryDate,
      title : this.diaryTitle,
      content : this.diaryContent,
      tag : this.tags,

    }
    console.log("diaryDate :: " + this.diaryDate);
    
    // this.diaryService.addDiaryData(inputDiaryData);
  }
  deleteDiaryFunction(){
    console.log('delete diary');
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}
