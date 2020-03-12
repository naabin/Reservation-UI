import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { first } from 'rxjs/operators';
import { UniqueUsernameValidator } from '../unique-username';
import { MatchPasswordVaildator } from '../matchpassword';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css']
})
export class UserUiComponent implements OnInit {

  user = new User();
  loading =  false;
  returnUrl: string;


  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required],  [this.uniquUsernameCheck.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {validators: this.matchPassword.validate});
  


  constructor(
    private userService: UserSerivice,
    private router: Router,
    private alertService: AlertService,
    private uniquUsernameCheck: UniqueUsernameValidator,
    private matchPassword: MatchPasswordVaildator
    ) { 
      if(this.userService.currentUserValue){
        this.router.navigate['/'];
      }
    }
  onSubmit() {
     if(this.signupForm.invalid){
       return;
     }
     this.loading = true;
     this.user.firstName = this.signupForm.get('firstName').value;
     this.user.lastName = this.signupForm.get('lastName').value;
     this.user.email = this.signupForm.get('email').value;
     this.user.username = this.signupForm.get('username').value;
     this.user.password = this.signupForm.get('password').value;
     
     this.userService.registerUser(this.user).subscribe({
       next: (val) => {
         this.alertService.success(val);
          this.router.navigateByUrl('/user/login');
          this.loading = false;
       },
       error: (err) => {
         if(err){
          this.signupForm.setErrors({unknown: true});
          this.loading = false;
         }
       }
     })
  }

  ngOnInit() {
  }

}
