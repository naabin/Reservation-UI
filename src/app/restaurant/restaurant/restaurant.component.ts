import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/models/restaurant';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurant: Restaurant;
  loading = false;



  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];

  restaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    openingHours: new FormArray([])
  })

  openingHours = this.restaurantForm.get('openingHours') as FormArray;

  
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private userService: UserSerivice,
    private alertService: AlertService
  ) { 

  }


  addOpeningHours(day: string){
    if(this.openingHours.length > 6){
      return;
    }
    let openingHourForm = new FormGroup({
      dayOfWeek: new FormControl(''),
      openFrom: new FormControl(''),
      openUntil: new FormControl('')
    });
    openingHourForm.patchValue({dayOfWeek: day})
    this.openingHours.push(openingHourForm);
  }


  onSubmit(){
    this.loading = true;
    this.restaurantService.createRestaurant(this.restaurantForm.value)
    .subscribe({
      next: () => {
        this.alertService.success('Created restaurant successfully');
        this.router.navigateByUrl('/reservation');
      },
      error: () => {
        this.alertService.error('Unknown Error happened');
        this.restaurantForm.setErrors({unknown: true});
        this.loading = false;
      }
    })
  }
  ngOnInit() {
  }

}
