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

  constructor(private route: ActivatedRoute,
    private photoService: PhotoService) { }

  ngOnInit() {
    const photoId = this.route.snapshot.params['photoId'];
    console.log(`recuperando detalhes da foto de id = ${photoId}`);
    this.foto$ = this.photoService
      .findById(photoId);
    // .subscribe(
    //   (retorno: Photo) => this.foto = retorno,
    //   (erro: HttpErrorResponse) => console.error(erro)
    // );
  }

}
