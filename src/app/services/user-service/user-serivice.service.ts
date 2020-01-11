import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {url} from '../../../util/romteUrl';
import { User } from 'src/models/user';
import { Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';
import { LoginDetails } from 'src/models/loginDetails';

@Injectable({
  providedIn: 'root'
})
export class UserSerivice {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  private remoteUrl = url;

  registerUser(user: User): Observable<User>{
    return this.http.post<User>(this.remoteUrl + 'api/user/register', JSON.stringify(user), this.httpOptions)
      .pipe(
        (tap((newUser: User) => this.messageService.add(`added user w/ id=${newUser.id}`)),
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

  authenticateUser(loginDetails: LoginDetails): Observable<LoginDetails> {
    return this.http.post<LoginDetails>(url, JSON.stringify(loginDetails), this.httpOptions);
  }
  
  constructor(private http: HttpClient, private messageService: MessageService) { }
}
