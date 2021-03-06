import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from '../../../util/remoteUrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;

  facebookUrl = FACEBOOK_AUTH_URL;
  gogleUrl = GOOGLE_AUTH_URL;

  constructor(
    private userService: UserSerivice,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    // if (this.userService.currentUserValue) {
    //   this.router.navigate['/'];
    // }
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.authenticateUser(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          if(error){
            this.loginForm.setErrors({credentials: true});
            this.loading = false;
          }
        }
      })

  }
  ngOnInit() {
    this.userService.logout();
    this.userService.currentRestaurantValue.next(null);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/restaurant';
  }
}
