import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSerivice } from '../services/user-service/user-serivice.service';


@Injectable({'providedIn': 'root'})
export class AuthGuard implements CanActivate {
    

    constructor(private router: Router, private authService: UserSerivice){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        this.authService.checkValidJWT().subscribe({
            next: () => {},
            error: (err) => {
                if(err){
                    localStorage.clear();
                    currentUser.next(null);
                    this.router.navigateByUrl('/user/login');
                }
            }
        })
        if(currentUser){
            return true;
        }
        //not logged in so redirect with login page with return url
        this.router.navigateByUrl('/user/login'), {queryParams: {returnUrl: state.url}};
        return false;
    }
}