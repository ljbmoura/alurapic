import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TokenService } from '../token/token.service';

const API_URL = 'http://localhost:3000';

@Injectable ({
    providedIn: 'root'
})
export class AuthService {

    constructor (private clienteHttp: HttpClient, private tokenGestor: TokenService) {}

    authenticate (nomeUsuario: string, senha: string): Observable<HttpResponse<Object>> {

        return this.clienteHttp
            .post (
                API_URL + '/user/login'
                , { userName: nomeUsuario, password: senha}
                , { observe: 'response', responseType: 'json'}
            )
            .pipe (
                tap ( (response) => {
                        const authToken = response.headers.get('x-access-token');
                        this.tokenGestor.setToken(authToken);
                        // tslint:disable-next-line: no-console
                        console.debug(`usuário ${nomeUsuario} autenticado com token ${authToken}`);
                    })
            );
    }
}
