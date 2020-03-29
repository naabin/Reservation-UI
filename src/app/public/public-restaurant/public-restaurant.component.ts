import { Component, OnInit } from '@angular/core';
import { PublicRestaurant } from 'src/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-public-restaurant',
  templateUrl: './public-restaurant.component.html',
  styleUrls: ['./public-restaurant.component.scss']
})
export class PublicRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, public dialog: MatDialog) { }

  restaurants = new BehaviorSubject<PublicRestaurant[]>(null);
  loading = true;

  ngOnInit() {
    this.restaurantService.getPublicRestaurants()
    .subscribe(
      {
        next: (restaurants) => {
          console.log(restaurants);
          this.restaurants.next(restaurants.content);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loading =false;
        }
      }
    )
  }
}
