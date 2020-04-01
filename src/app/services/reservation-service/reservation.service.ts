import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import {url} from '../../../util/remoteUrl';
import { Reservation, BookingsResponse } from 'src/models/reservation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageableResponse } from 'src/models/pageable';

 export interface ReservationResponse {
  content: BookingsResponse[];
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
export class ReservationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private remoteUrl = url;

  createReservation(reservation: Reservation, restaurantId: string){
    return this.http.post<{restaurantId: number}>(`${this.remoteUrl}api/reservation`,JSON.stringify(reservation), {params: {restaurantId: restaurantId}})
      .pipe(
      );
  }

  createPublicReservation(reservation: Reservation, restaurantName: string){
    return this.http.post<any>(`${this.remoteUrl}api/public/reservation`, JSON.stringify(reservation), {
      headers: this.httpOptions.headers,
      params: {
        restaurant: restaurantName
      }
    })
  }

  getReservations(restaurantId: string, pageSize?:number, pageNumber?:number): Observable<ReservationResponse>{
    const userId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get<ReservationResponse>(`${this.remoteUrl}api/reservation`, {
      params: 
      {
        restaurantId: restaurantId, 
        userId: userId, 
        pageSize:pageSize ?  String(pageSize) : String(10),
        pageNumber: pageNumber ?  String(pageNumber) : String(0)
      }
    }) ;
  }

  getReservationById(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reservation/${id}`;
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<Reservation>(url, {params: {restaurantId: String(restaurantId)}})
  }

  updateReservation(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reservation/${id}`;
    return this.http.put<Reservation>(url, JSON.stringify(id), this.httpOptions)
  }

  deleteReservation(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reseravtion/${id}`;
    return this.http.delete<Reservation>(url, this.httpOptions);
  }
  constructor(private http: HttpClient) { }
}
