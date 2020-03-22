import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import {url} from '../../../util/remoteUrl';
import { Reservation } from 'src/models/reservation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message-service/message.service';
import { tap, catchError } from 'rxjs/operators';
import { Restaurant } from 'src/models/restaurant';

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
    return this.http.post<{restaurantId: number}>(`${this.remoteUrl}api/reservation/new`,JSON.stringify(reservation), {params: {restaurantId: restaurantId}})
      .pipe(
        (tap(() => this.messageService.add(`Successfully created reservation.`)))
      );
  }

  createPublicReservation(reservation: Reservation, restaurantName: string){
    return this.http.post<any>(`${this.remoteUrl}api/public/reservation/new`, JSON.stringify(reservation), {
      headers: this.httpOptions.headers,
      params: {
        restaurant: restaurantName
      }
    })
    .pipe(
      (tap(() => this.messageService.add(`Successfully created reservation.`))));
  }

  getReservations(restaurantId: string): Observable<any>{
    const userId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get(`${this.remoteUrl}api/reservation/all`, {params: {restaurantId: restaurantId, userId: userId}}) ;
  }

  getReservationById(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reservation/${id}`;
    return this.http.get<Reservation>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`fetched reservation id=${id}`)),
        catchError(this.messageService.errorHandler<Reservation>('getReservationById')
        )
      );
  }

  updateReservation(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reservation/${id}`;
    return this.http.put<Reservation>(url, JSON.stringify(id), this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`reservation updated successfully with id=${id}`)),
        catchError(this.messageService.errorHandler<Reservation>('updateReservation')
        )
      );
  }

  deleteReservation(id: number): Observable<Reservation> {
    const url = `${this.remoteUrl}api/reseravtion/${id}`;
    return this.http.delete<Reservation>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`deleted user id=${id}`)),
        catchError(this.messageService.errorHandler<Reservation>('deleteReservation')
        )
      );
  }
  constructor(private http: HttpClient, private messageService: MessageService) { }
}
