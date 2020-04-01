import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import {IgxTimePickerModule} from 'igniteui-angular';
import { MatSnackBarModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ModalComponent } from '../shared/modal/modal.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';


@NgModule({
  declarations: [
    ReservationComponent,
    ReservationFormComponent,
    ConfirmReservationComponent,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    IgxTimePickerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    ReservationFormComponent
  ]
})
export class ReservationModule { }
