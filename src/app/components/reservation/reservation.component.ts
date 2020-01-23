import { Component, OnInit } from '@angular/core';

import {Reservation} from '../../../models/reservation';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { DateTime, DateTimeFormatOptions } from 'luxon';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate: Date = new Date();
  time: DateTimeFormatOptions;
  reservation: Reservation;
  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.time = DateTime.TIME_24_WITH_SECONDS;
    console.log(this.time);
  }

}
