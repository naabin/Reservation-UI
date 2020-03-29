import { Component, OnInit} from '@angular/core';
import { Reservation } from 'src/models/reservation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  constructor(
    private reservationService: ReservationService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackar: MatSnackBar) { }

  reservationForm: FormGroup;
  minimuDate = new Date();
  reservation: Reservation = new Reservation();
  loading = false;
  ngOnInit() {
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
      switchMap(({id, name}) => {
        if(name !== null && name !== undefined){
          return this.reservationService.createPublicReservation(this.reservationForm.value, name)
        }
        else if(id !== null && id !== undefined){
          console.log(typeof id)
          return this.reservationService.createReservation(this.reservationForm.value, id);
        }
        
      })
    ).subscribe({
      next: (resId) => {
        if(resId !== null){
          
          this.router.navigateByUrl('/reservation/'+ resId.restaurantId);
          this.loading = false;
        }
        else{
          this.openSnackBar('Resrvation successful', 'true');
          this.loading = false;
          this.router.navigateByUrl('/');
        }
      },
      error: (error) => {
        this.loading = false;
      }
    })
  }

  openSnackBar(message: string, action: string){
    this.snackar.open(message, action, {
      duration: 3000
    });
  }

}
