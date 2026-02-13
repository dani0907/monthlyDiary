import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CalendarPage } from './calendar-page/calendar-page';

export const routes: Routes = [
  {
    path:'',
    component: Layout,
    children:[
      {path:'', component:CalendarPage}
    ]
  }
];
