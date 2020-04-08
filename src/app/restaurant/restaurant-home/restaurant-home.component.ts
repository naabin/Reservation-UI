import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/models/restaurant';
import { ImageService } from 'src/app/services/image-service/image.service';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImageResponse } from 'src/models/image';
import { NotificationService } from 'src/app/services/notifcation-service/notification.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService, 
    private imageService: ImageService,
    private notificationService: NotificationService,
    private router: Router) { }

  restaurant: Restaurant;
  image: ImageResponse;
  loading = true;
  ngOnInit() {
    const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
    if(restaurantId === null){
      this.router.navigateByUrl('/restaurant/new');
    }
    else if(restaurantId){
      this.restaurantService.getRestaurant(restaurantId).subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          this.image = this.restaurant.image;
          this.loading = false;
        },
        error: (err) => {
          if(err){
            console.log(err.error.text);
            this.loading = false;
          }
        }
      })
    }
  }

  uploadImage(e: any): void{
    const file = e.files[0];
    if(file === undefined || file === null){
      this.notificationService.addError('Choose the file first');
      return;
    }
    const subject = new BehaviorSubject<any>(file);
    subject.pipe(
      switchMap((value) => {
        this.loading = true
        return this.imageService.uploadImageToRestaurant(value, this.restaurant.id)
      })
    ).subscribe((data) => {
      this.image = data;
      this.loading = false;
    }).unsubscribe();
  }

  updateImage(e:any){
    const file = e.files[0];
    if(file === undefined || file === null){
      this.notificationService.addError('Choose the file first');
      return;
    }
    const subject = new BehaviorSubject<any>(file);
    subject.pipe(
      switchMap((file) => {
        this.loading = true;
        return this.imageService.updateRestaurantProfileImage(file, this.restaurant.id, this.image.id, this.image.imageUrl)
      })
    ).subscribe((data) => {
      this.image = data;
      this.loading = false;
    })
  }
}
