import { Component, OnInit } from '@angular/core';

import { ReservationService, ReservationResponse } from 'src/app/services/reservation-service/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate = new Date();
  reservations: ReservationResponse;
  restaurantId: string;
  loading = true;
  
  constructor(
    private reservationService: ReservationService, 
    private route: ActivatedRoute) { 
  }
  ngOnInit() {
    this.restaurantId = this.route.snapshot.params.id;
    this.route.params.pipe(
      switchMap(({id}) => {
        return this.reservationService.getReservations(id)
      })
    ).subscribe({
      next: (response) => {
        this.reservations = response;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }
}
