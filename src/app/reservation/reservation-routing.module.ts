import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';


const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: ReservationFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
