import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicRestaurantComponent } from './public-restaurant/public-restaurant.component';
import { SharedModule } from '../shared/shared.module';
import { PublicReservationComponent } from './public-reservation/public-reservation.component';
import { ReservationModule } from '../reservation/reservation.module';


@NgModule({
  declarations: [PublicRestaurantComponent, PublicReservationComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ReservationModule
  ],
  exports: [
    PublicRestaurantComponent
  ]
})
export class PublicModule { }