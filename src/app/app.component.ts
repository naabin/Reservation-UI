import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { UserSerivice } from './services/user-service/user-serivice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserSerivice
  ){
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }
}
