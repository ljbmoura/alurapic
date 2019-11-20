import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  arquivo: File;

  constructor(private builder: FormBuilder) { }

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
    const dadosUpload = this.photoForm.getRawValue();
    console.log(dadosUpload);
    console.log(this.arquivo);
  }

}
