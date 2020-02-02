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
      'Content-Type': 'application/json'
    })
  }

  private remoteUrl = url;

  createReservation(reservation: Reservation): Observable<Reservation>{
    return this.http.post<Reservation>(`${this.remoteUrl}api/reservatuon/new`,JSON.stringify(reservation), this.httpOptions)
      .pipe(
        (tap((r: Reservation) => this.messageService.add(`Successfully created reservation with id=${r.id}`)),
        catchError(this.messageService.errorHandler<Reservation>('createReservation'))
        )
      );
  }

  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.remoteUrl}api/reservation/all`)
      .pipe(
        tap(_ => this.messageService.add('fetched all reservations')),
        catchError(this.messageService.errorHandler<Reservation[]>('getReservations', [])
        )
      );
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
