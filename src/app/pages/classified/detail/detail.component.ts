import {Component} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent{
  images: any[] = [
    {url: 'path/to/image1.jpg', alt: 'Image 1'},
    {url: 'path/to/image2.jpg', alt: 'Image 2'},
    {url: 'path/to/image3.jpg', alt: 'Image 3'}
  ];

  constructor() {
  }

}
