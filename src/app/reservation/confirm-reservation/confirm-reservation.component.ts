import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { Reservation } from 'src/models/reservation';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notifcation-service/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent implements OnInit {

  showModal = true;
  reservation: Reservation;
  step = 1;
  replyForm:FormGroup;
  // message: string;

  constructor(
    private route: ActivatedRoute, 
    private reservationService: ReservationService,
    private notificationsService: NotificationService,
    private router: Router
    ) {
      this.replyForm = new FormGroup({
        message: new FormControl(``, [Validators.required])
      })
    }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({id}) => {
        return this.reservationService.getReservationById(id)
      })
    ).subscribe({
      next:(reservation) => {
        this.reservation = reservation;
      },
      error:() => {
        this.notificationsService.addError('Something went wrong');
      }
    })
  }

  onSubmit(){
    console.log('Value ' + this.replyForm.get('message').value);
    this.showModal=false;
    const restaurantId = localStorage.getItem('restaurantId');
    this.router.navigateByUrl('/reservation/' + restaurantId);
  }
  nextStep(){
    this.step++;
  }
  num(numPeople: string){
    return Number(numPeople);
  }

}
