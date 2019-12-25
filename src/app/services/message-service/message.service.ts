import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];


  add(message: string): void{
    this.messages.push(message);
  }

  clear(): void{
    this.messages = [];
  }

  errorHandler<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      //send the error to remote logging infrastructure
      console.error(error);

      // better job of transforming error for user confirmation
      this.add(`${operation} failed: ${error.message}`)

      //Let the app keep running by returning an empty result
      return of(result as T);
    }
  }



  constructor() { }
}
