import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-diary',
  imports: [],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class Diary {
  @Input() selectedDay:number|null=null;
  
}
