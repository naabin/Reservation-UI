import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSerivice } from '../services/user-service/user-serivice.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    

    constructor(private userService: UserSerivice){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.userService.currentUserValue;
        if(request.url.includes('public')){
            return next.handle(request);
        }
        else if(currentUser.value !== null){
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            })
            return next.handle(request);
        }

        return next.handle(request);
        
    }
}