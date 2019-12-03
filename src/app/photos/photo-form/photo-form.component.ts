import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../photo/photo.service';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { finalize } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  arquivoParaUpload: File;
  arquivoBase64ParaPreview = '';
  percentDone = 0;

  constructor(private builder: FormBuilder
    , private service: PhotoService
    , private router: Router
    , private alertas: AlertService
    , private gestorUsuario: UserService) { }

  ngOnInit() {
    this.photoForm = this.builder.group(
      {
        file: ['', Validators.required]
        , description: ['', Validators.maxLength(300)]
        , allowComments: [true]
      }
    );
  }

  upload() {
    this.service.upload(
      this.photoForm.get('description').value
      , this.photoForm.get('allowComments').value
      , this.arquivoParaUpload)
      .pipe(finalize(
        () => this.router.navigate(['/user', this.gestorUsuario.getUserName()])
      ))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = event.loaded;
            console.log('uploading ' + this.percentDone);
          } else if (event instanceof HttpResponse) {
            console.log('upload realizado');
            this.alertas.success('Upload realizado.', true);
            // } else {
              //   console.log('evento' + event.type.toLocaleString);
            }
          }
          , (erro: HttpErrorResponse) => {
            console.error(`upload falhou: "${erro.message}"`);
            this.alertas.warning('Upload não realizado.');
          }
          , () => {
            console.log('completado.');
        }
      );
  }

  trataPreview(arquivoEscolhido: File) {
    this.arquivoParaUpload = arquivoEscolhido;
    const leitor: FileReader = new FileReader();
    // leitor.onload = (ev: any) => {this.arquivoBase64ParaPreview = ev.target.result; };
    leitor.onloadend = (ev: any) => { this.arquivoBase64ParaPreview = ev.target.result; };
    leitor.readAsDataURL(this.arquivoParaUpload);
  }

}
