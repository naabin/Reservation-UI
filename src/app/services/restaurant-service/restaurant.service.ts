import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {url} from '../../../util/remoteUrl';
import {HttpClient} from '@angular/common/http';
import { MessageService } from '../message-service/message.service';
import { Restaurant } from 'src/models/restaurant';
import { Observable } from 'rxjs';
import { catchError ,tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRestaurant(restuarant: Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(`${this.remoteUrl}api/restaurant/new`, restuarant, {params: {
      userId: JSON.parse(localStorage.getItem('userId'))
    }})
      .pipe(
        (tap((restaurant: Restaurant) => {
          this.messageService.add(`Successfully created restaurant with an id:`);
          localStorage.removeItem('restaurantId');
          localStorage.setItem('restaurantId', JSON.stringify(restaurant.id))
        })))
  }

  getRestaurants(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.remoteUrl}api/restaurant/all`, this.httpOptions)
      .pipe(
        (tap(_ => this.messageService.add(`fetched all restaurants`)),
        catchError(this.messageService.errorHandler<Restaurant[]>('getRestaurants')))
      )
  }

  getRestaurant(id:string): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/restaurant/${id}`;
    return this.http.get<Restaurant>(url, {params: {userId: JSON.parse(localStorage.getItem('userId'))}})
      .pipe(
        tap(_ => this.messageService.add(`fetched restaurant with an id = ${_.id}`)),
      );
  }

  updateRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/restaurant/${id}`;
    return this.http.put<Restaurant>(url, JSON.stringify(id), this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`reservation updated successfully.`)),
        catchError(this.messageService.errorHandler<Restaurant>('updateRestaurant'))
      );
  }

  deleteRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.remoteUrl}api/reservation/${id}`;

    return this.http.delete<Restaurant>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`deleted user id=${id}`)),
        catchError(this.messageService.errorHandler<Restaurant>('deleteRestaurant'))
      )
  }

}

