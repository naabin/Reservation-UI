import { AsyncValidator, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserSerivice } from '../services/user-service/user-serivice.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({providedIn: 'root'})
 export class UniqueUsernameValidator implements AsyncValidator{
    constructor(private authService: UserSerivice){}

    validate = (control: FormControl) => {
        const {value}  = control;
        return this.authService.usernameAvailable(value).pipe(
            map((res) => {
                if(res.available){
                    return null;
                }
            }),
            catchError((err) => {
                if(err){
                    return of({nonUniqueUsername: true})
                }
                else {
                    return of({noConnection: true})
                }
            })
        )
    }
 }