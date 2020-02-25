import { Component, OnInit } from '@angular/core';

import {Reservation} from '../../../models/reservation';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate: Date = new Date();
  reservation: Reservation;
  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
  }

}
