import { TestBed } from '@angular/core/testing';

import { UserSerivice } from './user-serivice.service';

describe('UserSeriviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSerivice = TestBed.get(UserSerivice);
    expect(service).toBeTruthy();
  });
});
