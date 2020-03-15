import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  

  user: User;
  error: string;
  loading = true;
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordConfirmation: new FormControl(''),
  })


  constructor(private userService: UserSerivice, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({id}) => {
        return this.userService.getUser(id);
      })
    )
    .subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    })
  }

}
