import { Component, OnInit } from '@angular/core';

import {Reservation} from '../../../models/reservation';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { MessageService } from 'src/app/services/message-service/message.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate: Date = new Date();
  reservation = new Reservation();

  reservationList: Reservation[];

  showModal = false;
  constructor(private reservationService: ReservationService, private messageService: MessageService) { 
  }

  ngOnInit() {

    this.reservationService.getReservations().subscribe({
      next: (value) => {
        this.reservationList = value;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  onSubmit(reservation: Reservation){
    this.showModal = false;
    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        this.messageService.add('successfully submitted the reservation request.')
      },
      error: (error)=> {
        console.log(error);
      }
    })
  }

}
