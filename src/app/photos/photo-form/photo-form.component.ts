import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  arquivo: File;

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
      , this.arquivo).subscribe(
          () => {
            console.log('upload realizado');
            this.router.navigate(['']);
          }
          , (erro: HttpErrorResponse) => {
            console.error(`upload falhou: "${erro.message}"`);
          }
      );
  }

}
