import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/services/nav-service/nav-service.service';

@Component({
  selector: 'app-public-reservation',
  templateUrl: './public-reservation.component.html',
  styleUrls: ['./public-reservation.component.scss']
})
export class PublicReservationComponent implements OnInit {

  constructor(private navService: NavServiceService) { }

  
  ngOnInit() {
    this.navService.visible.next(false);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.navService.visible.next(true);
  }

}
