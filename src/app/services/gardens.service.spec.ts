import { TestBed } from '@angular/core/testing';

import { GardensService } from './gardens.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GardensService', () => {
  let service: GardensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(GardensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
