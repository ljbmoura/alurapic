import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoCommentsComponent } from './photo-comments.component';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only.directive';

@NgModule({

  imports: [
    CommonModule
    , RouterModule
    , PhotoModule
    , VMessageModule
    , ReactiveFormsModule
  ],

  declarations: [
    PhotoDetailsComponent
    , PhotoCommentsComponent
    , PhotoOwnerOnlyDirective
  ]
})
export class PhotoDetailsModule { }
