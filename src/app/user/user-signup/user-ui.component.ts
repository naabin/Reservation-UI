import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { UniqueUsernameValidator } from '../unique-username';
import { UniquEmailValidator } from '../unique-email';
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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email], [this.uniqueEmailCheck.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {validators: this.matchPassword.validate});
  


  constructor(
    private userService: UserSerivice,
    private router: Router,
    private uniquUsernameCheck: UniqueUsernameValidator,
    private uniqueEmailCheck: UniquEmailValidator,
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
     this.user.name= this.signupForm.get('name').value;
     this.user.email = this.signupForm.get('email').value;
     this.user.password = this.signupForm.get('password').value;
     
     this.userService.registerUser(this.user).subscribe({
       next: (val) => {
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
