import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDialogComponent } from './section-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('SectionDialogComponent', () => {
  let component: SectionDialogComponent;
  let fixture: ComponentFixture<SectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {
            snapshot: { plantId: '12345' }
        }},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
