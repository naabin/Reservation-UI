import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';
import {MatInputModule} from '@angular/material';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css']
})
export class UserUiComponent implements OnInit {

  constructor(private userService: UserSerivice) { }

  user: User;

  ngOnInit() {

  }

}
