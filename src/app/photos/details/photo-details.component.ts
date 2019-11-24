import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

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
      console.log(`(observadorExclusao) Foto ${this.photoId} exclu�da com sucesso.`);
      this.alertService.success('Foto exclu�da com sucesso');
      this.router.navigate(['/user', this.gestorUsuario.getUserName()]);
    },
    error: (err: HttpErrorResponse) => {
      const msg = 'erro na exclus�o: ';
      console.error(`(observadorExclusao) "${msg}${JSON.stringify(err)}"`);
      this.alertService.warning(msg + `${err.message}`);
    },
    complete: () => console.log('(observadorExclusao) completado.'),
  };

  observadorBusca = {
    next: () => {
      console.log(`(observadorBusca) Foto ${this.photoId} recuperada com sucesso.`);
    },
    error: (err: HttpErrorResponse) => {
      const msg = 'erro na busca: ';
      console.error(`(observadorBusca) "${msg}${JSON.stringify(err)}"`);
      this.router.navigate(['not-found']);
    },
    complete: () => console.log('(observadorBusca) completado.'),
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService,
    private gestorUsuario: UserService) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId'];
    // console.log(`recuperando detalhes da foto de id = ${this.photoId}`);
    this.foto$ = this.photoService.findById(this.photoId);
    this.foto$.subscribe(this.observadorBusca);
  }

  exclui () {
    this.photoService.remove(this.photoId)
      .subscribe (this.observadorExclusao);
  }
}
