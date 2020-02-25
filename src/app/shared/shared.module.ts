import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from 'angular-bootstrap-md';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    NavbarComponent,
    AlertComponent,
  ]
})
export class SharedModule { }
