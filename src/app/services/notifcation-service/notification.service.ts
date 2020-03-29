import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';


export interface Notification {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationInput: Subject<Notification>;
  notificationOutput: Observable<Notification[]>
  

  constructor() { 
    this.notificationInput = new Subject();
    this.notificationOutput = this.notificationInput.pipe(
      scan((messages: Notification[], notifcation:Notification) => {
        if(notifcation.type === 'clear'){
          return messages.filter(message => message.id !== notifcation.id);
        }
        else{
          return [...messages, notifcation];
        }
      }, [])
    )
  }

  addSuccess(message: string){
    const id = this.randomId();
    this.notificationInput.next(
      {
        id: id,
        type: "success",
        text: message
      }
    )

    setTimeout(() => {this.clear(id)},5000)
    
  }

  addError(message: string){
    const id =  this.randomId();
    this.notificationInput.next(
      {
        id: id,
        type: "error",
        text: message
      }
    )
    setTimeout(() => {this.clear(id)},5000)
  }
  
  clear(id: number){
    this.notificationInput.next({id, type:"clear"});
  }

  private randomId(){
    return Math.round(Math.random() * 100000);
  }
}
