import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject: Subject<User> = new BehaviorSubject<User>(null);

    constructor(private tokenGestao: TokenService) {
        // tslint:disable-next-line: no-unused-expression
        tokenGestao.hasToken() && this.decodeAndNotify(); // para a reabertura do browser com o token ainda válido
    }

    setToken(token: string) {
        this.tokenGestao.setToken(token);
        this.decodeAndNotify();
    }

    getUser (): Observable<User> {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenGestao.getToken();
        const usuario = jwt_decode(token) as User;
        this.userSubject.next(usuario);
    }

}
