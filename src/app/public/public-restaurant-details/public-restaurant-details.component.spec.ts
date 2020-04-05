import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRestaurantDetailsComponent } from './public-restaurant-details.component';

describe('PublicRestaurantDetailsComponent', () => {
  let component: PublicRestaurantDetailsComponent;
  let fixture: ComponentFixture<PublicRestaurantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicRestaurantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRestaurantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
