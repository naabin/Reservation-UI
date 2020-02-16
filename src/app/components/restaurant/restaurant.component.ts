import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/models/restaurant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  restaurantForm: FormGroup;

  loading = false;

  submitted = false;

  returnUrl: string;



  constructor(
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  get f() {return this.restaurantForm.controls};

  onSubmit(){
    this.submitted = true;
    this.restaurant.name = this.f.name.value;
    this.restaurant.address = this.f.address.value;
    this.restaurant.phoneNumber = this.f.phoneNumber.value;
    this.restaurant.openingHours = this.f.openingHours.value;

    this.loading = true;

    this.restaurantService.createRestaurant(this.restaurant)
      .pipe(
        first())
        .subscribe(data => {
          this.alertService.success('Restaurant profile updated', true);
          this.router.navigate[this.returnUrl];
          this.loading = false;
          this.restaurant = new Restaurant();
        },
        error => {
          this.alertService.error(error.message);
          this.loading = false;
        })
  }

  ngOnInit() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      openingHours: ['', Validators.required]
    })
  }

}
