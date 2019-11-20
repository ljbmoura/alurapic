import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-rodape',
  templateUrl: './rodape.component.html'
})
export class RodapeComponent implements OnInit {

  user$: Observable<User>;
  constructor(private userGestor: UserService) { }

  ngOnInit() {
    this.user$ = this.userGestor.getUser();
  }

}
