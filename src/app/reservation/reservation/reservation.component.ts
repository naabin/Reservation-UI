import { Component, OnInit } from '@angular/core';

import {Reservation} from '../../../models/reservation';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NavServiceService } from 'src/app/services/nav-service/nav-service.service';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate = new Date();
  reservationList: Reservation[] = [];
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
        this.reservationList = response;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }
}
