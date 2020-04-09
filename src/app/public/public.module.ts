import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicRestaurantComponent } from './public-restaurant/public-restaurant.component';
import { SharedModule } from '../shared/shared.module';
import { PublicReservationComponent } from './public-reservation/public-reservation.component';
import { ReservationModule } from '../reservation/reservation.module';
import { PublicRestaurantDetailsComponent } from './public-restaurant-details/public-restaurant-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PublicRestaurantComponent, PublicReservationComponent, PublicRestaurantDetailsComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ReservationModule
  ],
  exports: [
    PublicRestaurantComponent
  ]
})
export class PublicModule { }
