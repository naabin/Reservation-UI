import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSerivice } from '../services/user-service/user-serivice.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    

    constructor(private userService: UserSerivice){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        //Add authorization header with jwt token if availanle

        let currentUser = this.userService.currentUserValue;

        if(currentUser){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return next.handle(request);
        }
        
    }
}