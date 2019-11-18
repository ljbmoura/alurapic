import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';

@NgModule({
  imports: [
     CommonModule // exportado a partir do BrowserModule que por sua vez foi importado em app.module.ts
    , HttpClientModule
    , PhotoListModule
    , PhotoFormModule
  ]
})
export class PhotosModule { }
