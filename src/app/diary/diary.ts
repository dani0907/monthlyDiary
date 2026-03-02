import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryInfo } from '../diary-info';
@Component({
  selector: 'app-diary',
  imports: [CommonModule],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class Diary {
  @Input() selectedDay:number|null=null;
  @Input() diary: DiaryInfo | null = null;
  
}
