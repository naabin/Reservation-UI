import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/models/restaurant';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  restaurant: Restaurant;
  ngOnInit() {
    const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
    if(restaurantId === null){
      this.router.navigateByUrl('/restaurant/new');
    }
    else if(restaurantId){
      this.restaurantService.getRestaurant(restaurantId).subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }


}
