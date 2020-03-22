import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicReservationComponent } from './public-reservation/public-reservation.component';
import { PublicRestaurantComponent } from './public-restaurant/public-restaurant.component';


const routes: Routes = [
  {
    path: ':name/make-reservation',
    component: PublicReservationComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: PublicRestaurantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
