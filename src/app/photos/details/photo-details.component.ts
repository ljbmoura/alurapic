import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  foto$: Observable<Photo>;
  photoId: number;
  observadorExclusao = {
    next: () => {
      console.log('(observadorExclusao) exclusão realizada com sucesso.');
      this.alertService.success('Foto removida com sucesso');
      this.router.navigate(['/']);
    },
    error: (err: HttpErrorResponse) => {
      const msg = 'erro na exclusão: ';
      console.error(`(observadorExclusao) "${msg}${JSON.stringify(err)}"`);
      this.alertService.warning(msg + `${err.message}`);
    },
    complete: () => console.log('(observadorExclusao) completado.'),
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId'];
    console.log(`recuperando detalhes da foto de id = ${this.photoId}`);
    this.foto$ = this.photoService.findById(this.photoId);
  }

  exclui () {
    this.photoService.remove(this.photoId)
      .subscribe (this.observadorExclusao);
  }
}
