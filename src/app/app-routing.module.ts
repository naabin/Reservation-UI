import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicRestaurantComponent } from './public/public-restaurant/public-restaurant.component';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule)
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  //otherwise redirect to loginpage
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

