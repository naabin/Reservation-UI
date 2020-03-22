import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReservationComponent } from './public-reservation.component';

describe('PublicReservationComponent', () => {
  let component: PublicReservationComponent;
  let fixture: ComponentFixture<PublicReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
