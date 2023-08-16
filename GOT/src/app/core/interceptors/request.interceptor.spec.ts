import { TestBed } from '@angular/core/testing';

import { RequestIntercepor } from './request.interceptor';

describe('AddHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestIntercepor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestIntercepor = TestBed.inject(RequestIntercepor);
    expect(interceptor).toBeTruthy();
  });
});
