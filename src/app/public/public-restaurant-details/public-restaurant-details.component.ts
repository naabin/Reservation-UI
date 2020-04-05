import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Restaurant, PublicRestaurant } from "src/models/restaurant";
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { switchMap, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notifcation-service/notification.service';
import { OpeningHours } from 'src/models/openingHours';

@Component({
  selector: "app-public-restaurant-details",
  templateUrl: "./public-restaurant-details.component.html",
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  styleUrls: ["./public-restaurant-details.component.scss"]
})
export class PublicRestaurantDetailsComponent implements OnInit {
  location: Location;
  state: any;
  showAll = false;
  loading = false;
  restaurant: PublicRestaurant
  today = new Date().getDay();
  constructor
    (
      private route: ActivatedRoute, 
      location: Location, 
      private restaurantService: RestaurantService,
      private notificationService: NotificationService
    ) 
    {
      this.location = location;
    }

  ngOnInit() {
    this.state = this.location.getState();
    if(this.state && this.state.restaurant){
      this.restaurant = this.state.restaurant;
    }
    
    else{
      this.loading =true;
      this.route.params.pipe(
        switchMap(({restaurant}) => {
          return this.restaurantService.getPublicRestaurantByName(restaurant);
        })
      ).subscribe((res) => {
          this.restaurant = res;
          this.loading = false;
      },() => this.notificationService.addError('Something went wrong. Please refresh the page.'))
    }    
  }

  sortDays(days:OpeningHours[]){
    return days.sort((a, b) => a.dayOfWeek.indexOf(''));
  }
}
