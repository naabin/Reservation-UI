import { Component, OnInit, Input } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';
import { NavServiceService } from 'src/app/services/nav-service/nav-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  
  constructor(
    private userService: UserSerivice, 
    private navService: NavServiceService,
    private route: Router) {

    this.isActive$ = this.userService.currentUserValue;
    this.restaurantId$ = this.userService.currentRestaurantValue;
    this.visible$ = this.navService.visible;
   }

  visible$: BehaviorSubject<Boolean>;
  isActive$: BehaviorSubject<User>;
  restaurantId$: BehaviorSubject<string>;

  searchForm = new FormGroup({
    'search': new FormControl('')
  });
  

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/user/login');
  }


  ngOnInit() {
  }

}
