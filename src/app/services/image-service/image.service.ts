import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notifcation-service/notification.service';

import {url} from '../../../util/remoteUrl';
import { ImageResponse } from 'src/models/image';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private remoteUrl = url;
  constructor(private http: HttpClient, private notificationService: NotificationService) { }


  getImageFromRestaurant(restaurantId: number){
    return this.http.get<ImageResponse>(`${this.remoteUrl}api/image`, {params: {restaunrantId: String(restaurantId)}});
  }


  uploadImageToRestaurant(file: File, restaurantId:number): Observable<ImageResponse>{
    const formdata = new FormData();
    formdata.append('file', file);
    return this.http.post<ImageResponse>(`${this.remoteUrl}api/image`, formdata, {params: {restaurantId: String(restaurantId)}})
      .pipe(
        tap(
          () => {this.notificationService.addSuccess('Image has been uploaded')}, 
          () => this.notificationService.addError('Something went wrong')),
      );
  }

  updateRestaurantProfileImage(file: File, restaurantId: number, imageId: number, currentImageUrl: string): Observable<ImageResponse>{
    const formdata = new FormData();
    formdata.append('file', file);
    return this.http.put<ImageResponse>(`${this.remoteUrl}api/image/${imageId}`, formdata, 
      {params: 
        {
          restaurantId: String(restaurantId),
          currentImageUrl: currentImageUrl
        }})
        .pipe(
          tap(
            () => {this.notificationService.addSuccess('Image has been updated')}, 
            () => this.notificationService.addError('Something went wrong')),
        );
  }

  deleteImage(imageUrl: string, imageId: number, restaurantId: number){
    return this.http.delete(`${this.remoteUrl}api/image/${imageId}`, {
      params: {
        imageURL: imageUrl, 
        restaurantId: String(restaurantId)
    }})
      .pipe(
        tap(
          () => this.notificationService.addSuccess('Succesfully deleted image'),
          () => this.notificationService.addError('Could not delete the image')
        )
      );
  }

}
