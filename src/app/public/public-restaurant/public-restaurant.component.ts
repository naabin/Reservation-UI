import { Component, OnInit } from '@angular/core';
import { PublicRestaurant } from 'src/models/restaurant';
import { RestaurantService, PublicRestaurantResponse } from 'src/app/services/restaurant-service/restaurant.service';
import { BehaviorSubject} from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, merge, map, mergeAll, reduce, mergeMap} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';

@Component({
  selector: 'app-public-restaurant',
  templateUrl: './public-restaurant.component.html',
  styleUrls: ['./public-restaurant.component.scss']
})
export class PublicRestaurantComponent implements OnInit {

  constructor(
    private restaurantService: RestaurantService, 
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private userService: UserSerivice,
    private router: Router) {
      console.log(this.route.snapshot.queryParams);
      const token = this.route.snapshot.queryParams.token;
      const userId = this.route.snapshot.queryParams.userId;
      const user = this.userService.currentUserValue;
      if(token !== null && token !== undefined ){
        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('token', JSON.stringify(token));
        user.next(token);
        this.userService.getUser(userId).subscribe((data) => {
          if(data.restaurant === null){
            this.router.navigateByUrl('/restaurant/new');
          }
          else{
            const resId = localStorage.getItem('restaurantId');
            if(resId !== null && resId !== undefined){
              this.router.navigateByUrl('/restaurant');
            }
            else{
              const restaurantId = data.restaurant.id;
              localStorage.setItem('restaurantId', JSON.stringify(restaurantId))
                this.router.navigateByUrl('/reservation/' + restaurantId)
            }
          }
        })
      }
   }

  restaurants: PublicRestaurant[];
  loading = true;
  moreLoading = false;
  pageNumber: number;
  pageSize: number;
  searchList: PublicRestaurant[];
  last: boolean;
  searching = false;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  ngOnInit() {
    this.restaurantService.getPublicRestaurants()
    .subscribe(
      {
        next: (res) => {
          this.restaurants = res.content;
          this.pageNumber = res.pageable.pageNumber
          this.pageSize =   res.pageable.pageSize;
          this.last = res.last;
        },
        error: (err) => {
          this.router.navigateByUrl('/');
        },
        complete: () => {
          this.loading =false;
        }
      }
    )
  }

  searchRestaurants(search: string){
    const subject = new BehaviorSubject<string>(search);
    subject.pipe(
      switchMap((searchValue) => {
          this.searching = true;
          return this.restaurantService.getPublicRestaurants(this.pageNumber, this.pageSize, searchValue);
      })
    ).subscribe((data) => {
      this.searchList = data.content;
    })
  }
  sendDataToComponent(data:PublicRestaurant){
    this.router.navigate([`${data.name}/details`], {state: {restaurant: data}});
  }

  fetchMoreRestaurants(){
    if(!this.last){
      this.moreLoading = true;
      this.pageNumber += 1;
      this.restaurantService.getPublicRestaurants(this.pageNumber, this.pageSize)
        .subscribe((data) => {
          this.last = data.last;
          this.restaurants.push(...data.content);
          this.moreLoading = false;
        });
    }
  }
}
