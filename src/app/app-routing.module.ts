import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserUiComponent } from './components/user-signup/user-ui.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AuthGuard } from './guards/auth.guard';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: UserUiComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant',
    component: RestaurantComponent,
    canActivate: [AuthGuard]
  },
  //otherwise redirect to loginpag
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
