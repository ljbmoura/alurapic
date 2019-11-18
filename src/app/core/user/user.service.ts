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
    private nomeUsuario: string;

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

    logout() {
        this.tokenGestao.removeToken();
        this.userSubject.next(null);
    }

    private decodeAndNotify() {
        const token = this.tokenGestao.getToken();
        const usuario = jwt_decode(token) as User;
        this.nomeUsuario = usuario.name;
        this.userSubject.next(usuario);
    }

    isLoggeg () {
        return this.tokenGestao.hasToken();
    }

    getUserName(): string {
        return this.nomeUsuario;
    }

}
