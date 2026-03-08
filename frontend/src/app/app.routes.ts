import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CalendarPage } from './calendar-page/calendar-page';
import { MonthlyDiary } from './monthly-diary/monthly-diary';

export const routes: Routes = [
  {
    path:'',
    component: Layout,
    children:[
      {path:'', component:CalendarPage},
      {path:'monthly', component:CalendarPage},
      {path:'diary',component:MonthlyDiary}
    ]
  }
];
