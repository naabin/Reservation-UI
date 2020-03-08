import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import {url} from '../../../util/remoteUrl';
import { Reservation } from 'src/models/reservation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message-service/message.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    })
  }

  private remoteUrl = url;

  createReservation(reservation: Reservation): Observable<Reservation>{
    return this.http.post<any>(`${this.remoteUrl}api/reservation/new`,JSON.stringify(reservation))
      .pipe(
        (tap(() => this.messageService.add(`Successfully created reservation.`)),
        catchError(this.messageService.errorHandler('createReservation'))
        )
      );
  }

  getReservations(): Observable<any>{
    return this.http.get(`${this.remoteUrl}api/reservation/all`);
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
