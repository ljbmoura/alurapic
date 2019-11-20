import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  foto$: Observable<Photo>;
  photoId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId'];
    console.log(`recuperando detalhes da foto de id = ${this.photoId}`);
    this.foto$ = this.photoService.findById(this.photoId);
  }

  exclui () {
    const observadorExclusao = {
      next: () => {
        console.log('(observadorExclusao) exclusão realizada com sucesso.');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        const msg = 'erro na exclusão: ';
        console.error(`(observadorExclusao) "${msg}${JSON.stringify(err)}"`);
        alert(msg + `${err.message}`);
      },
      complete: () => console.log('(observadorExclusao) completado.'),
    };
    this.photoService.remove(this.photoId).subscribe (observadorExclusao);
  }
}
