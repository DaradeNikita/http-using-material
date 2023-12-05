import { TestBed } from '@angular/core/testing';

import { PostInterceptorService } from './post-interceptor.service';

describe('PostInterceptorService', () => {
  let service: PostInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
