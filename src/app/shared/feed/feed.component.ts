import { Component, OnInit, Input } from '@angular/core';
import { ImageResponse } from 'src/models/image';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor() { }

  @Input("title") title: string;

  @Input("image") image: ImageResponse;

  ngOnInit() {
  }

}
