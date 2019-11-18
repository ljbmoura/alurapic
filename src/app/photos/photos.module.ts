import { NgModule } from '@angular/core';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';

@NgModule({
  imports: [
    PhotoListModule
    , PhotoFormModule
  ]
})
export class PhotosModule { }
