import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  visible: BehaviorSubject<Boolean>;

  constructor() { 
    this.visible = new BehaviorSubject(true);
  }
}
