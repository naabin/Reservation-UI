import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {url} from '../../../util/remoteUrl';
import {HttpClient} from '@angular/common/http';
import { Restaurant, PublicRestaurant } from 'src/models/restaurant';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserSerivice } from '../user-service/user-serivice.service';
import { NotificationService } from '../notifcation-service/notification.service';
import { PageableResponse } from 'src/models/pageable';


export interface PublicRestaurantResponse {
  content: PublicRestaurant[];
  pageable: PageableResponse;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private remoteUrl = url;

  constructor(
    private http: HttpClient, 
    private userService: UserSerivice,
    private notificationService: NotificationService) { }

  createRestaurant(restuarant: Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(`${this.remoteUrl}api/restaurant`, restuarant, {params: {
      userId: JSON.parse(localStorage.getItem('userId'))
    }})
      .pipe(
        (tap((restaurant: Restaurant) => {
          this.userService.currentRestaurantValue.next(restaurant.id.toString())
          localStorage.removeItem('restaurantId');
          localStorage.setItem('restaurantId', JSON.stringify(restaurant.id))
        })))
  }

  getRestaurants(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.remoteUrl}api/restaurant/all`, this.httpOptions)
  }

  getPublicRestaurants(): Observable<PublicRestaurantResponse> {
    return this.http.get<PublicRestaurantResponse>(`${this.remoteUrl}api/public/restaurant`);
  }

  getRestaurant(id:string): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/restaurant/${id}`;
    return this.http.get<Restaurant>(url, {params: {userId: JSON.parse(localStorage.getItem('userId'))}})
      
  }

  updateRestaurant(id: number, restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/restaurant/${id.toString()}`;
    return this.http.put<Restaurant>(url, restaurant, this.httpOptions)
    .pipe(
      tap(() => this.notificationService.addSuccess('Successfully updated the restaurant profile'),
      () => {
        this.notificationService.addError('Somthing went wrong');
      }
      ),
    )
  }

  deleteRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/reservation/${id}`;

    return this.http.delete<Restaurant>(url, this.httpOptions);
  }

}

