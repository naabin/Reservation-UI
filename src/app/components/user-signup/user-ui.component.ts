import { Component, OnInit } from '@angular/core';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { User } from 'src/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css']
})
export class UserUiComponent implements OnInit {

  user: User = new User();
  signupForm: FormGroup;
  loading =  false;
  submitted = false;
  returnUrl: string;

  constructor(
    private userService: UserSerivice,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
    ) { 
      if(this.userService.currentUserValue){
        this.router.navigate['/'];
      }
    }
  get f() {return this.signupForm.controls};

  onSubmit() {
     this.submitted = true;
     if(this.signupForm.invalid){
       return;
     }
     this.user.firstName = this.f.firstName.value;
     this.user.lastName = this.f.lastName.value;
     this.user.email = this.f.email.value;
     this.user.username = this.f.username.value;
     this.user.password = this.f.password.value;

     this.loading = true;

     this.userService.registerUser(this.user).pipe(first())
      .subscribe(data => {
        console.log(data);
        this.alertService.success("Registration successful");
        this.router.navigate['/login'];
        this.loading = false;
      },
      error => {
        this.alertService.error(error.message);
        this.loading = false;
      })
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}
