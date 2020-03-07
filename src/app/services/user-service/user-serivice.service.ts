import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {url} from '../../../util/remoteUrl';
import { User } from 'src/models/user';
import { Observable, BehaviorSubject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';


@Injectable({
  providedIn: 'root'
})
export class UserSerivice {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  private remoteUrl = url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  registerUser(user: User): Observable<any>{
    return this.http.post<any>(this.remoteUrl + 'api/user/register', JSON.stringify(user), this.httpOptions)
      .pipe(
        (tap((newUser: User) => this.messageService.add(`added user with id=${newUser.id}`)),
        catchError(this.messageService.errorHandler<User>('registerUser'))
        )
      )
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.remoteUrl + 'api/user/')
      .pipe(
        tap(_ => this.messageService.add('fetched all users')),
        catchError(this.messageService.errorHandler<User[]>('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.remoteUrl}api/user/${id}`;
    return this.http.get<User>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`fetched user id=$${id}`)),
        catchError(this.messageService.errorHandler<User>(`getUser id=${id}`))
      )
  }

  deleteUser(user: User): Observable<User>{
    const id = typeof user === 'number' ? user : user.id;

    

    const url = `${this.remoteUrl}api/user/${id}`;
    return this.http.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`deleted user id=${id}`)),
        catchError(this.messageService.errorHandler<User>('deleteUser'))
      )
  }

  authenticateUser(username: string, password: string) {
    return this.http.post<any>(`${url}authenticate`, JSON.stringify({'username': username, 'password': password}), this.httpOptions)
      .pipe(
        map(res => {
        if(res !== null && res !== undefined){
          localStorage.setItem('token', JSON.stringify(res));
          this.currentUserSubject.next(res);
        }
        return res;
      }))
  }

  usernameAvailable(username: string){
    return this.http.post<{available: boolean}>(`${this.remoteUrl}api/user/checkuniqueuser`, {}, {params: {
      username: username
    }})
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
