import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import {
  ReservationService,
  ReservationResponse
} from "src/app/services/reservation-service/reservation.service";
import { merge } from "rxjs";
import { switchMap } from "rxjs/operators";
import { BookingsResponse } from "src/models/reservation";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<BookingsResponse>;
  displayedColumns = [
    "confirmed",
    "fullName",
    "email",
    "phoneNumber",
    "numberOfPeople",
    "date",
    "time",
    "specialRequest"
  ];
  @Input() data: ReservationResponse;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<BookingsResponse>(
      this.data.content
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(value: string) {
    this.dataSource.filter = value;
  }

  ngAfterViewInit() {
    const restaurantId = localStorage.getItem("restaurantId");
    if (!this.data.last) {
      merge(this.paginator.page)
        .pipe(
          switchMap(() => {
            return this.reservationService.getReservations(
              restaurantId,
              this.paginator.pageSize + 10
            );
          })
        )
        .subscribe(data => {
          this.data = data;
          this.dataSource.data = data.content;
        });
    }
  }
}
