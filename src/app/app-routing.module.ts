import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { PhotosModule } from './photos/photos.module';
import { ErrorsModule } from './errors/errors.module';
import { SigninComponent } from './home/signin/signin.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
    { path: '',
      component: SigninComponent
    },

    { path: 'user/:userName',
      component: PhotoListComponent,
      resolve: {
        fotos: PhotoListResolver
      }
    },

    { path: 'p/add',
      component: PhotoFormComponent
    },

    { path: '**',
      component: NotFoundComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    , ErrorsModule
    , PhotosModule
    , HomeModule
  ]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
