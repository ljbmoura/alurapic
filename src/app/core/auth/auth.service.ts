import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable ({
    providedIn: 'root'
})
export class AuthService {

    constructor (private http: HttpClient) {}

    authenticate (nomeUsuario: string, senha: string): Observable<HttpResponse<Object>> {

        return this.http
            .post (
                API_URL + '/user/login'
                , { userName: nomeUsuario, password: senha}
                , { observe: 'response', responseType: 'json'}
            )
            .pipe (
                tap ( (response) => {
                        const authToken = response.headers.get('x-access-token');
                        // tslint:disable-next-line: no-console
                        console.debug(`usuário ${nomeUsuario} autenticado com token ${authToken}`);
                    })
            );
    }
}
