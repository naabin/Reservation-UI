import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Bookings, ReservationService, ReservationResponse } from 'src/app/services/reservation-service/reservation.service';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Bookings>;
  displayedColumns = ['fullName', 'email', 'phoneNumber', 'numberOfPeople', 'date', 'time', 'specialRequest'];
  @Input() data:ReservationResponse;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Bookings>(this.data.content);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(value:string){
    this.dataSource.filter = value;
  }

  ngAfterViewInit(){
    const restaurantId = localStorage.getItem('restaurantId');
    if(!this.data.last){
      merge(this.paginator.page)
      .pipe(
        switchMap(() => {
          return this.reservationService.getReservations(restaurantId,this.paginator.pageSize+10)
        })
      ).subscribe((data) => {
        this.data = data;
        this.dataSource.data = data.content;
      })
    }

  }

}
