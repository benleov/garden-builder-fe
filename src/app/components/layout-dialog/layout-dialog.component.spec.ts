import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDialogComponent } from './layout-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('LayoutDialogComponent', () => {
  let component: LayoutDialogComponent;
  let fixture: ComponentFixture<LayoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {
          layout: {
            name: '',
            beds: [],
          }
        }},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
