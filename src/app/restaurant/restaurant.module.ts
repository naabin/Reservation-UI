import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { IgxTimePickerModule } from 'igniteui-angular';
import { MatSelectModule } from '@angular/material';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';


@NgModule({
  declarations: [
    RestaurantComponent,
    OpeningHoursComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    IgxTimePickerModule,
    MatSelectModule
  ]
})
export class RestaurantModule { }
