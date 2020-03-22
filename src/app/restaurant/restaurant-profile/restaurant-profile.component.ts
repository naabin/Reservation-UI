import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Restaurant } from 'src/models/restaurant';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitLoading = false;

  constructor(
    private restaurantService: RestaurantService, 
    private router: Router,
    private route: ActivatedRoute) {
      
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
    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant && this.restaurant.name),
      address: new FormControl(this.restaurant && this.restaurant.address),
      phoneNumber: new FormControl(this.restaurant && this.restaurant.phoneNumber),
      email: new FormControl(this.restaurant && this.restaurant.email),
      siteAddress: new FormControl(this.restaurant && this.restaurant.siteAddress),
      about: new FormControl(''),
      openingHours: new FormArray([])
    })
    this.openingHours = this.restaurantForm.get('openingHours') as FormArray;
  }

  openHours(){
    let openHourFormGroup = new FormGroup({
      'dayOfWeek': new FormControl(''),
      'openFrom': new FormControl(''),
      'openUntil': new FormControl('')
    })
    this.openingHours.push(openHourFormGroup);
  }

  onSubmit(){
    this.submitLoading = true;
    this.restaurantService.updateRestaurant(this.restaurant.id,this.restaurantForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.submitLoading = false;
        this.router.navigateByUrl('/restaurant/' + this.restaurant.id);
      },
      error: (err)=> {
        console.log(err);
        this.submitLoading = false;
      }
    })
  }

}
