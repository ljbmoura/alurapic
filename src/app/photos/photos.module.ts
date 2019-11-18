import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { FilterByDescriptionPipe } from './photo-list/filter-by-description.pipe';

@NgModule({
  declarations: [
    PhotoComponent
    , PhotoListComponent
    , PhotoFormComponent
    , PhotosComponent
    , FilterByDescriptionPipe
  ],
  imports: [
    HttpClientModule
    , CommonModule // exportado a partir do BrowserModule que por sua vez foi importado em app.module.ts
  ]
})
export class PhotosModule { }
