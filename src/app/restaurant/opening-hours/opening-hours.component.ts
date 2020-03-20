import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OpeningHours } from 'src/models/openingHours';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {

  @Input() control: FormControl;
  @Input() days: [];
  @Input() givenOpeningHours: OpeningHours;

  givenOpenFrom: Date = new Date();
  givenOpenUntil: Date = new Date();

  constructor() {
   }

  ngOnInit() {
    this.givenOpenFrom = new Date(this.givenOpeningHours && this.givenOpeningHours.openFrom);
    this.givenOpenUntil = new Date(this.givenOpeningHours && this.givenOpeningHours.openUntil);
    console.log(this.givenOpenFrom)
  }

}
