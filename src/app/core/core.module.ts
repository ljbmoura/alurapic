import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho/cabecalho.component';
import { RouterModule } from '@angular/router';

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

})
export class CoreModule { }
