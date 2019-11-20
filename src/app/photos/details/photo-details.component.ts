import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  foto$: Observable<Photo>;
  photoId: number;

  constructor(private route: ActivatedRoute,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId'];
    console.log(`recuperando detalhes da foto de id = ${this.photoId}`);
    this.foto$ = this.photoService
      .findById(this.photoId);
  }

}
