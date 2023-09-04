import { TestBed } from '@angular/core/testing';

import { SubscripitonService } from './subscripiton.service';

describe('SubscripitonService', () => {
  let service: SubscripitonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscripitonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
