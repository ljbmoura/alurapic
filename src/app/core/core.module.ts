import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho/cabecalho.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
  ]
  , declarations: [
    CabecalhoComponent
  ]
  , exports: [
    CabecalhoComponent
  ]
  , providers: [
    { provide: HTTP_INTERCEPTORS
    , useClass: RequestInterceptor
    , multi: true}
  ]

})
export class CoreModule { }
