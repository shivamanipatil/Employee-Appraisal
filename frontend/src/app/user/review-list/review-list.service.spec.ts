import { TestBed } from '@angular/core/testing';

import { ReviewListService } from './review-list.service';

describe('ReviewListService', () => {
  let service: ReviewListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
