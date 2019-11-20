import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../photo/photo.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  arquivoParaUpload: File;
  arquivoBase64ParaPreview = '';

  constructor(private builder: FormBuilder
    , private service: PhotoService
    , private router: Router) { }

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
    .subscribe(
      () => {
        console.log('upload realizado');
        this.router.navigate(['']);
      }
      , (erro: HttpErrorResponse) => {
        console.error(`upload falhou: "${erro.message}"`);
      }
    );
  }

  trataPreview(arquivoEscolhido: File) {
    this.arquivoParaUpload = arquivoEscolhido;
    const leitor: FileReader = new FileReader();
    // leitor.onload = (ev: any) => {this.arquivoBase64ParaPreview = ev.target.result; };
    leitor.onloadend = (ev: any) => {this.arquivoBase64ParaPreview = ev.target.result; };
    leitor.readAsDataURL(this.arquivoParaUpload);
  }

}
