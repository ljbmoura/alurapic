import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { PhotosModule } from './photos/photos.module';
import { ErrorsModule } from './errors/errors.module';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/details/photo-details.component';
import { AlertModule } from './shared/components/alert/alert.module';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    }
     , {
         path: 'home',
         loadChildren: './home/home.module#HomeModule'
       }
    , {
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve: {
            fotos: PhotoListResolver
        }
    }, {
        path: 'p/add',
        component: PhotoFormComponent
        , canActivate: [AuthGuard]
    }, {
        path: 'p/:photoId',
        component: PhotoDetailsComponent
        // , canActivate: [AuthGuard]
    }, {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
    , ErrorsModule
    , PhotosModule
    , AlertModule
  ]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
