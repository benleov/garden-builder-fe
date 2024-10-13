import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenBedComponent } from './garden-bed.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GardenBedComponent', () => {
  let component: GardenBedComponent;
  let fixture: ComponentFixture<GardenBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GardenBedComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenBedComponent);
    fixture.componentInstance.bed = {
      id: '123',
      rows: []
    };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
