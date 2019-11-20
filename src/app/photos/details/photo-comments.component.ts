import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photoComment';
import { PhotoService } from '../photo/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

  comentariosFoto$: Observable<PhotoComment[]>;
  @Input('photoId') photoId: number;

  formComments: FormGroup;

  constructor(private photoService: PhotoService, private builder: FormBuilder) { }

  ngOnInit() {
    this.comentariosFoto$ = this.photoService.getComments(this.photoId);
    this.formComments = this.builder.group({
        comment: ['', Validators.maxLength(100)]
    });
  }

  publica() {
    const comment = this.formComments.get('comment').value as string;
    this.comentariosFoto$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.formComments.reset();
                alert('Comentário adicionado com sucesso');
      }));

    // this.photoService.
    //    addComment(this.photoId, comment)
    // .subscribe(() => {
    //     this.formComments.reset();
    //     alert('Comentário adicionado com sucesso');
    // });
  }
}
