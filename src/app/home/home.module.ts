import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignUpComponent as SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { SignUpService } from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';

@NgModule ({
    declarations: [
        HomeComponent
        , SigninComponent
        , SignUpComponent
    ],
    imports: [
        CommonModule
        , ReactiveFormsModule
        , VMessageModule
        , RouterModule
        , HomeRoutingModule
    ]
    , providers: [
        SignUpService
    ]
})
export class HomeModule {}
