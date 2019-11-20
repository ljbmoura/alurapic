import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { RodapeComponent } from './rodape/rodape.component';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
  ]
  , declarations: [
    CabecalhoComponent
    , RodapeComponent
  ]
  , exports: [
    CabecalhoComponent
    , RodapeComponent
  ]
  , providers: [
    { provide: HTTP_INTERCEPTORS
    , useClass: RequestInterceptor
    , multi: true}
  ]

})
export class CoreModule { }
