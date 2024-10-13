import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHistoryDialogComponent } from './section-history-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('SectionHistoryDialogComponent', () => {
  let component: SectionHistoryDialogComponent;
  let fixture: ComponentFixture<SectionHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHistoryDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {
            sectionState: []
        }},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
