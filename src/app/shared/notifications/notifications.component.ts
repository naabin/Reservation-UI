import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from 'src/app/services/notifcation-service/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications$: Observable<Notification[]>

  constructor(private notificationService: NotificationService) { 
    this.notifications$ = this.notificationService.notificationOutput;
  }

  ngOnInit() {
  }

  clearMessge(id: number){
    this.notificationService.clear(id);
  }

}
