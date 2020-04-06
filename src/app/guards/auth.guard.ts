import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSerivice } from '../services/user-service/user-serivice.service';


@Injectable({'providedIn': 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: UserSerivice){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
         this.authService.checkValidJWT().subscribe({
            next: (res) => {
                if(res.tokenExpired){
                    localStorage.clear();
                    currentUser.next(null);
                    return false;
                }
            },
            error: (err) => {
                if(err){
                    localStorage.clear();
                    currentUser.next(null);
                    this.router.navigateByUrl('/');
                }
            }
        })
        if(currentUser.value !== null){
            return true;
        }
        this.router.navigate(['user/login'], {queryParams: {returnUrl: state.url.toString()}});
        return false;
    }
}