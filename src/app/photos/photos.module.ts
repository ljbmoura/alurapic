import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    PhotoComponent
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotosModule { }
