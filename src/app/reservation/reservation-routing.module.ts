import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';


const routes: Routes = [
  {
    path: 'new/:id',
    component: ReservationFormComponent,
    canActivate: [AuthGuard],
    pathMatch:'full'
  },
  {
    path: ':id',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
