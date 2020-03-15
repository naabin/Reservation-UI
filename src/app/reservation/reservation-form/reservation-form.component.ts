import { Component, OnInit} from '@angular/core';
import { Reservation } from 'src/models/reservation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { MessageService } from 'src/app/services/message-service/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  constructor(
    private reservationService: ReservationService, 
    private messageService: MessageService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  reservationForm: FormGroup;
  minimuDate = new Date();
  reservation: Reservation = new Reservation();
  loading = false;
  ngOnInit() {
   this.activatedRoute.params.subscribe((d) => {
     console.log(d);
   })
    const {fullName, email, date, time, numberOfPeople, phoneNumber, specialRequest} = this.reservation;
    this.reservationForm = new FormGroup({
      fullName: new FormControl(fullName, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      date: new FormControl(date, [Validators.required]),
      time: new FormControl(time, [Validators.required]),
      numberOfPeople: new FormControl(numberOfPeople, [Validators.required]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required]),
      specialRequest: new FormControl(specialRequest)
    })
  }

  onSubmit(){
    if(this.reservationForm.invalid){
      return;
    }
    this.loading = true;
    this.activatedRoute.params.pipe(
      switchMap(({id}) => {
        return this.reservationService.createReservation(this.reservationForm.value, id)
      })
    ).subscribe({
      next: (resId) => {
        this.messageService.add('Reservation successfully created.');
        this.router.navigateByUrl('/reservation/'+ resId.restaurantId);
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add(error.message);
        this.loading = false;
      }
    })
  }

}
