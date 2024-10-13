import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionGroupSelectDialogComponent } from './section-group-select-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('SectionGroupSelectDialogComponent', () => {
  let component: SectionGroupSelectDialogComponent;
  let fixture: ComponentFixture<SectionGroupSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionGroupSelectDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGroupSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
