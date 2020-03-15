import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AuthGuard } from '../guards/auth.guard';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: 'new',
    component: RestaurantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: RestaurantHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:':id',
        component: RestaurantProfileComponent
      },
      {
        path: 'user/:id',
        component: UserProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
