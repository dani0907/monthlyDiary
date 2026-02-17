import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDiary } from './monthly-diary';

describe('MonthlyDiary', () => {
  let component: MonthlyDiary;
  let fixture: ComponentFixture<MonthlyDiary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyDiary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyDiary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
