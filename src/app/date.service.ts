import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class DateService{
  private viewDateSource = new BehaviorSubject<Date>(new Date());
  viewDate$ = this.viewDateSource.asObservable();

  // change the date
  updateDate(newDate: Date) {
    this.viewDateSource.next(newDate);
    console.log("updateDate ***" + newDate);
  }
  getValue():Date{
    return this.viewDateSource.getValue();
  }
}