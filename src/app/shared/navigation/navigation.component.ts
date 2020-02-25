import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserSerivice, private route: Router) { }

  isActive =  false;

  logout() {
    this.userService.logout();
    this.route.navigate(['/login']);
  }

  ngOnInit() {
    if(this.userService.currentUserValue){
      this.isActive = true;
    }
  }

}
