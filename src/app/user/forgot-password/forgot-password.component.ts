import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatchPasswordVaildator } from '../matchpassword';
import { UserSerivice } from 'src/app/services/user-service/user-serivice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  modalOpen = true;
  noEmail = false;
  loading = false;
  step = 1;

  constructor(
    private passwordMatch: MatchPasswordVaildator,
    private router: Router,
    private userService: UserSerivice) { }


  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    resetToken: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('',[Validators.required, Validators.minLength(6)])
  },{validators: this.passwordMatch.validate})

  checkEmail(){
    this.loading = true;
    this.userService.sendToken(this.forgotPasswordForm.get('email').value)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.step += 1;
      },
      error: () => {
          this.forgotPasswordForm.setErrors({noEmail: true});
          this.loading = false;
      }
    })
  }

  validatToken(){
    this.loading = true;
    this.userService.validateToken(this.forgotPasswordForm.get('resetToken').value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.step += 1;
        },
        error: () => {
            this.forgotPasswordForm.setErrors({invalidToken: true});
            this.loading = false;
        }
      })
  }


  showErrors(){
    const {dirty, touched, errors} = this.forgotPasswordForm;
    return dirty && touched && errors;
  }

  onFormSubmit(){
    if(this.forgotPasswordForm.invalid){
      return;
    }
    this.loading = true;
    const email = this.forgotPasswordForm.get('email').value;
    const password = this.forgotPasswordForm.get('password').value;
    this.userService.resetPassword(email, password)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/user/login')
          this.loading = false;
        },
        error: () => {
            this.forgotPasswordForm.setErrors({unknown: true})
            this.loading = false;
        }
      })

  }

  ngOnInit() {

  }

}
