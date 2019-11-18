import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-cabecalho',
  templateUrl: './cabecalho.component.html',
})
export class CabecalhoComponent {

  user$: Observable<User>;

  constructor(
    private usuariosGestao: UserService
    , private router: Router) {
    this.user$ = this.usuariosGestao.getUser();
  }

  logout() {
    this.usuariosGestao.logout();
    this.router.navigate(['']);
  }

}
