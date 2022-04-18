import { TestBed } from '@angular/core/testing';

import { TokenLocalstorageService } from './token-localstorage.service';

describe('TokenLocalstorageService', () => {
  let service: TokenLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
