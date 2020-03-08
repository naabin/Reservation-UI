import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    NavigationComponent,
    AlertComponent,
    InputComponent,
    ModalComponent,
    TableComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    NavigationComponent,
    AlertComponent,
    InputComponent,
    ModalComponent,
    TableComponent
  ]
})
export class SharedModule { }
