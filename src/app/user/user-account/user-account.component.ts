import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';
import { UserRole } from 'src/models/userRole';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  userRoles: UserRole;
  constructor(private userService: UserSerivice) { }

  ngOnInit() {
    if(this.userService.currentUserValue){
      this.user = this.userService.currentUserValue.value;
      console.log(this.user);
    }
    
  }

}
