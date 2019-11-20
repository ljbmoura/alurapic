import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { PhotoFormComponent } from './photo-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        CommonModule
        , VMessageModule
        , ReactiveFormsModule
        , PhotoModule
        , ImmediateClickModule
        , AlertModule
    ]
})
export class PhotoFormModule {}
