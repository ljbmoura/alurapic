import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoModule } from '../photo/photo.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescriptionPipe } from './filter-by-description.pipe';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [
        PhotoListComponent
        , PhotosComponent
        , LoadButtonComponent
        , FilterByDescriptionPipe
        , SearchComponent
    ],
    imports: [
        CommonModule
        , HttpClientModule
        , RouterModule
        , PhotoModule
        , CardModule
        , DarkenOnHoverModule
        , ShowIfLoggedModule
    ]
})
export class PhotoListModule {}
