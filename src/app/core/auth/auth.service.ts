import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment.prod';

const API = environment.apiUrl;

@Injectable ({
    providedIn: 'root'
})
export class AuthService {

    constructor (private clienteHttp: HttpClient, private usuariosGestao: UserService) {}

    authenticate (nomeUsuario: string, senha: string): Observable<HttpResponse<Object>> {

        return this.clienteHttp
            .post (
                API + '/user/login'
                , { userName: nomeUsuario, password: senha}
                , { observe: 'response', responseType: 'json'}
            )
            .pipe (
                tap ( (response) => {
                        const authToken = response.headers.get('x-access-token');
                        this.usuariosGestao.setToken(authToken);
                        // tslint:disable-next-line: no-console
                        console.debug(`usuário ${nomeUsuario} autenticado com token ${authToken}`);
                    })
            );
    }
}
