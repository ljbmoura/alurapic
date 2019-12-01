import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginGuard } from '../core/auth/login.guard';

const routes: Routes = [
    {   path: ''
        , component: HomeComponent
        , canActivate: [LoginGuard]
        , children: [
            {
                path: ''
                , component: SigninComponent
                , data: {
                    title: 'Sign in'
                }
            }, {
                path: 'signup'
                , component: SignUpComponent
                , data: {
                    title: 'Sign up'
                }
            }
        ]
    }
];
@NgModule ({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class HomeRoutingModule {}
