import { TestBed } from '@angular/core/testing';

import { UserSeriviceService } from './user-serivice.service';

describe('UserSeriviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSeriviceService = TestBed.get(UserSeriviceService);
    expect(service).toBeTruthy();
  });
});
