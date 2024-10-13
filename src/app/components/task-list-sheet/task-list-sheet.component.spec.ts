import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListSheetComponent } from './task-list-sheet.component';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

describe('TaskListSheetComponent', () => {
  let component: TaskListSheetComponent;
  let fixture: ComponentFixture<TaskListSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListSheetComponent ],
      providers: [
        { provide: MatBottomSheetRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
