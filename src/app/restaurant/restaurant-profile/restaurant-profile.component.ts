import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Restaurant } from 'src/models/restaurant';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.scss']
})
export class RestaurantProfileComponent implements OnInit {

  restaurant: Restaurant
  error: string;
  restaurantForm: FormGroup;
  openingHours: FormArray;
  loading = true;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) {
      this.restaurantForm = new FormGroup({
        name: new FormControl(''),
        address: new FormControl(''),
        phoneNumber: new FormControl(''),
        openingHours: new FormArray([])
      })
      this.openingHours = this.restaurantForm.get('openingHours') as FormArray;
   }
  

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({id}) => {
        return this.restaurantService.getRestaurant(id);
      })
    ).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    })
  }

  openHours(){
    let openHourFormGroup = new FormGroup({
      'dayOfWeek': new FormControl(''),
      'openFrom': new FormControl(''),
      'openUntil': new FormControl('')
    })
    this.openingHours.push(openHourFormGroup);
  }

}
