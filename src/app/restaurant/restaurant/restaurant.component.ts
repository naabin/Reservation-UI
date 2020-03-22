import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  loading = false;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
  restaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
    about: new FormControl(''),
    siteAddress: new FormControl(''),
    openingHours: new FormArray([])
  })
  openingHours = this.restaurantForm.get('openingHours') as FormArray;
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { 
  }
  addOpeningHours(){
    if(this.openingHours.length > 6){
      return;
    }
    let openingHourForm = new FormGroup({
      dayOfWeek: new FormControl(''),
      openFrom: new FormControl(''),
      openUntil: new FormControl()
    });
    this.openingHours.push(openingHourForm);
  }


  onSubmit(){
    this.loading = true;
    this.restaurantService.createRestaurant(this.restaurantForm.value)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/reservation');
      },
      error: () => {
        this.restaurantForm.setErrors({unknown: true});
        this.loading = false;
        this.restaurantForm.reset();
      }
    })
  }
  ngOnInit() {
  }

}
