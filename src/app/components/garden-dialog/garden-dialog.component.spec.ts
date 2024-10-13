import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDialogComponent } from './garden-dialog.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GardenDialogComponent', () => {
  let component: GardenDialogComponent;
  let fixture: ComponentFixture<GardenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GardenDialogComponent],
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
    fixture = TestBed.createComponent(GardenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
