import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {url} from '../../../util/remoteUrl';
import { User } from 'src/models/user';
import { Observable, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import { NotificationService } from '../notifcation-service/notification.service';


@Injectable({
  providedIn: 'root'
})
export class UserSerivice {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentRestaurantSubject: BehaviorSubject<string>;
  public currentRestaurant: Observable<string>;
  private remoteUrl = url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentRestaurantSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('restaurantId')));
    this.currentRestaurant = this.currentRestaurantSubject.asObservable();
  }

  public get currentRestaurantValue(): BehaviorSubject<string>{
      return this.currentRestaurantSubject;
  }

  public get currentUserValue(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }
  registerUser(user: User): Observable<string>{
    return this.http.post<string>(this.remoteUrl + 'api/user', JSON.stringify(user), this.httpOptions)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.remoteUrl + 'api/user/')
  }

  getUser(id: number): Observable<User> {
    const url = `${this.remoteUrl}api/user/${id}`;
    return this.http.get<User>(url);
  }

  deleteUser(user: User): Observable<User>{
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.remoteUrl}api/user/${id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  sendToken(email: string){
    return this.http.post<any>(`${this.remoteUrl}api/user/sendtoken`, 
    {}, {params: {email: email}});
  }

  validateToken(token: string){
    return this.http.post<any>(`${this.remoteUrl}api/user/validatetoken`, {}, {params: {resetToken: token}});
  }

  resetPassword(email: string, password: string){
    return this.http.post<any>(`${this.remoteUrl}api/user/resetpassword`, {}, {params: {email: email, password: password}});
  }

  authenticateUser(username: string, password: string) {
    return this.http.post<User>(`${url}api/auth/authenticate`, JSON.stringify({'username': username, 'password': password}), this.httpOptions)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          this.currentRestaurantSubject.next(user.restaurantId);
          localStorage.setItem('token', JSON.stringify(user.jwtToken));
          localStorage.setItem('userId', JSON.stringify(user.id)),
          localStorage.setItem('restaurantId', JSON.stringify(user.restaurantId))
          this.notificationService.addSuccess('Login successful');
      }))
  }

  usernameAvailable(username: string){
    return this.http.post<{available: boolean}>(`${this.remoteUrl}api/user/checkuniqueuser`, {}, {params: {
      username: username
    }})
  }

  uniqueEmailAvailable(email: string){
    return this.http.post<{available: boolean}>(`${this.remoteUrl}api/user/checkavailableemail`, {}, {params: {email: email}})
  }

  checkValidJWT(){
    return this.http.post<{tokenExpired: boolean}>(`${this.remoteUrl}api/auth/validtoken`, {})
      .pipe(
        tap(
          (res) => {console.log(res)},
          () => {
            this.notificationService.addError('User session timed out.');
          })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('restaurantId');
    this.currentUserSubject.next(null);
    this.currentRestaurantSubject.next(null);
  }
}
