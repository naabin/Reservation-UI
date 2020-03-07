import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }


  @Input('label') label: string;
  @Input('control') control: FormControl;
  @Input('inputType') inputType: string;

  ngOnInit() {
  }

  showErrors(){
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }

}
