import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class DateService{
  private viewDateSource = new BehaviorSubject<Date>(new Date());
  viewDate$ = this.viewDateSource.asObservable();

  // 날짜를 변경하는 함수
  updateDate(newDate: Date) {
    this.viewDateSource.next(newDate);
    console.log("updateDate ***" + newDate);
  }
  getValue():Date{
    return this.viewDateSource.getValue();
  }
}