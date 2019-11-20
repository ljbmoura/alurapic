import { NgModule } from '@angular/core';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoDetailsComponent } from './details/photo-details.component';

@NgModule({
  imports: [
    PhotoListModule
    , PhotoFormModule
  ],
  declarations: [PhotoDetailsComponent]
})
export class PhotosModule { }
