import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { IgxTimePickerModule } from 'igniteui-angular';
import { MatSelectModule, MatTabsModule } from '@angular/material';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatStepperModule} from "@angular/material/stepper";


@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantHomeComponent,
    OpeningHoursComponent,
    RestaurantProfileComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    IgxTimePickerModule,
    MatSelectModule,
    MatTabsModule,
    MatStepperModule,
  ]
})
export class RestaurantModule { }
