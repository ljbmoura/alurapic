import { NgModule } from '@angular/core';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoDetailsComponent } from './details/photo-details.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  declarations: [PhotoDetailsComponent],
  imports: [
    CommonModule
    , PhotoListModule
    , PhotoFormModule
    , PhotoModule
  ]
})
export class PhotosModule { }
