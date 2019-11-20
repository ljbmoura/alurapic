import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photoComment';
import { PhotoService } from '../photo/photo.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

  comentariosFoto$: Observable<PhotoComment[]>;
  @Input('photoId') photoId: number;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.comentariosFoto$ = this.photoService.getComments(this.photoId);
    this.comentariosFoto$.subscribe(
      (retorno) => console.log(`foto de id ${this.photoId} possui ${retorno.length} comentários`)
    );
  }

}
