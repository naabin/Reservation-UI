import { Component, OnInit } from '@angular/core';
import { PublicRestaurant } from 'src/models/restaurant';
import { RestaurantService, PublicRestaurantResponse } from 'src/app/services/restaurant-service/restaurant.service';
import { BehaviorSubject} from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { switchMap, merge, map, mergeAll, reduce, mergeMap} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-public-restaurant',
  templateUrl: './public-restaurant.component.html',
  styleUrls: ['./public-restaurant.component.scss']
})
export class PublicRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, public dialog: MatDialog, private router: Router) { }

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
