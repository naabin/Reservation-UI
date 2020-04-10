import { Component, OnInit, Input } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant-service/restaurant.service";
import { Router } from "@angular/router";
import { Restaurant } from "src/models/restaurant";
import { ImageService } from "src/app/services/image-service/image.service";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ImageResponse } from "src/models/image";
import { NotificationService } from "src/app/services/notifcation-service/notification.service";

@Component({
  selector: "app-restaurant-home",
  templateUrl: "./restaurant-home.component.html",
  styleUrls: ["./restaurant-home.component.scss"]
})
export class RestaurantHomeComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private imageService: ImageService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  restaurant: Restaurant;
  image$ = new BehaviorSubject<ImageResponse>(null);
  showModal = false;
  loading = true;
  ngOnInit() {
    const restaurantId = JSON.parse(localStorage.getItem("restaurantId"));
    if (restaurantId === null) {
      this.router.navigateByUrl("/restaurant/new");
    } else if (restaurantId) {
      this.restaurantService.getRestaurant(restaurantId).subscribe({
        next: restaurant => {
          this.restaurant = restaurant;
          this.image$.next(this.restaurant.image);
          this.loading = false;
        },
        error: err => {
          if (err) {
            console.log(err.error.text);
            this.loading = false;
          }
        }
      });
    }
  }

  uploadImage(e: any) {
    const file = e.files[0];
    this.loading = true;
    if (file === undefined || file === null) {
      this.notificationService.addError("Choose the file first");
      return; 
    }
    this.imageService.uploadImageToRestaurant(file, this.restaurant.id)
      .subscribe((data) => {
        this.loading = false;
        this.image$.next(data);
      })
  }
  updateImage(e: any) {
    const file = e.files[0];
    if (file === undefined || file === null) {
      this.notificationService.addError("Choose the file first");
      return;
    }
    this.loading = true;
    const {imageUrl, id} = this.image$.value;
    this.imageService.updateRestaurantProfileImage(file,this.restaurant.id, id, imageUrl)
      .subscribe((data) => {
        this.showModal= false;
        this.image$.next(data)
        this.loading = false;
        return;
      })
  }

  deleteImage() {
    this.loading = true;
    this.image$
      .pipe(
        switchMap(data => {
          const { imageUrl, id } = data;
          return this.imageService.deleteImage(
            imageUrl,
            id,
            this.restaurant.id
          );
        })
      )
      .subscribe(
        () => {
          this.image$.next(null);
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }
}
