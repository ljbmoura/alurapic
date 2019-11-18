import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { Subject, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-cabecalho',
  templateUrl: './cabecalho.component.html',
})
export class CabecalhoComponent {

  user: User;
  user$: Observable<User>;

  constructor(private usuariosGestao: UserService) {
    this.user$ = this.usuariosGestao.getUser();
    this.user$.subscribe({
        next: (user: User) => { this.user = user; }
      , error: (msg) => { console.log(msg); }
      }
    );
  }

}
