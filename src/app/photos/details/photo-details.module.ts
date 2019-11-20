import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCommentsComponent } from './photo-comments.component';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { RouterModule } from '@angular/router';

@NgModule({

  imports: [
    CommonModule
    , RouterModule
    , PhotoModule
  ],

  declarations: [
    PhotoDetailsComponent
    , PhotoCommentsComponent
  ]
})
export class PhotoDetailsModule { }
