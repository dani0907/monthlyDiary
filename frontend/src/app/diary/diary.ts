import { Component,Input,Output,EventEmitter,inject,ChangeDetectorRef } from '@angular/core';
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
  @Output() saveDiary = new EventEmitter<void>();
  cdr = inject(ChangeDetectorRef);
  diaryService = inject(DiaryService);
  dateService = inject(DateService);

  tags: string[] = [];
  _id:string = '';
  tagInput: string = '';
  diaryTitle:string='';
  diaryContent:string='';
  diaryDate:Date = new Date();

  currentDate = this.dateService.getValue();


  ngOnChanges() {
    this._id = this.diary?._id ?? '';
    this.tags = this.diary?.tag ? [...this.diary.tag] : [];
    this.diaryTitle = this.diary?.title ?? '';
    this.diaryContent = this.diary?.content ?? '';
    this.diaryDate = this.diary?.date ?? (
      this.day !== null
      ? new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.day)
      : new Date() 
    );
    console.log('id check : ' + this._id);
  }

  clearData(){
    this.tags = [];
    this._id = '';
    this.tagInput = '';
    this.diaryTitle ='';
    this.diaryContent ='';
  }
  onTagKeydown(event: KeyboardEvent) {
    // prevent process two times when the user type Korean.
    if (event.key === 'Enter' && event.isComposing) return;
    if (event.key === 'Enter' && this.tagInput.trim()) {
      event.preventDefault();
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }
  checkEdit(){
    if(!this._id){
      this.addDiaryFunction();
    } else{
      this.editDiaryFunction();
    }
  }
  editDiaryFunction(){
    console.log(`click the edit button`);
    const editDiaryData : DiaryInfo = {
      date : this.diaryDate,
      title : this.diaryTitle,
      content : this.diaryContent,
      tag : this.tags,
    }
    this.diaryService.editDiary(this._id, editDiaryData ).subscribe({
      next:(data)=>{
        console.log(`successfully edited : ${JSON.stringify(data)}`);
        this.saveDiary.emit();
      },
      error:(err)=>{
        console.log(`fail to edit`);
      }
    });
  }
  addDiaryFunction(){
    console.log(`*** addDiaryFunction ***`);
    
    const inputDiaryData : DiaryInfo = {
      date : this.diaryDate,
      title : this.diaryTitle,
      content : this.diaryContent,
      tag : this.tags,

    }
    console.log("addDiaryFunction diaryDate :: " + this.diaryDate);
    console.log("addDiaryFunction inputDiaryData  :: " + JSON.stringify(inputDiaryData));
    this.diaryService.addDiaryData(inputDiaryData).subscribe({
      next : (data) =>{
        console.log(`save success : ${JSON.stringify(data)}`);
        this.saveDiary.emit();
      },
      error : (err)=>{
        console.log(`fail to save`);
      }
    });
    
  }
  deleteDiaryFunction(){
    if (!this._id) return; 
    console.log('click delete diary');
    console.log('delete item id : '+ this._id);
    this.diaryService.deleteDiary(this._id).subscribe({
      next : (data)=>{
        console.log('delete sucess : '+this._id);
        this.saveDiary.emit();
        this.clearData();
      },
      error:(err)=>{
        console.log(`fail to delete`);
      }
    })
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}
