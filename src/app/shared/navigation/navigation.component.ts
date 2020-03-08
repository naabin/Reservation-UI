import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  constructor(private userService: UserSerivice, private route: Router) {

    this.isActive$ = this.userService.currentUserValue;
   }

  isActive$: BehaviorSubject<User>;

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/user/login');
  }


  ngOnInit() {

  }

}
