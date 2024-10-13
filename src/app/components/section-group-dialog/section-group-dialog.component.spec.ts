import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGroupDialogComponent } from './section-group-dialog.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectionGroupDialogComponent', () => {
  let component: SectionGroupDialogComponent;
  let fixture: ComponentFixture<SectionGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SectionGroupDialogComponent],
    imports: [],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
