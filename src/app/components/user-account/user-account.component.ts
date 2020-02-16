import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  constructor(private userService: UserSerivice) { }

  ngOnInit() {
    if(this.userService.currentUserValue){
      this.user = this.userService.currentUserValue;
    }
  }

}
