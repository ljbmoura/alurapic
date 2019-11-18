import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, first, map } from 'rxjs/operators';
import { UsuarioReg } from './usuarioReg';
import { Router } from '@angular/router';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    constructor(private clienteHttp: HttpClient
        , private router: Router) {}

    signup(novoUsuario: UsuarioReg) {
        return this.clienteHttp.post(`${API}/user/signup`, novoUsuario)
            .subscribe(
                () => {
                    this.router.navigate(['']);
                },
                err => console.log(err)
            );
    }

    checkUserNameTaken (userName: string) {
        return this.clienteHttp.get(API + '/user/exists/' + userName);
    }

    checkUserNameTakenValidator () {
        return (controle: AbstractControl) => {
            return controle.valueChanges
            .pipe(debounceTime(300))
            .pipe(switchMap( userName => this.checkUserNameTaken(userName) ))
            .pipe(map(isTaken => isTaken ? { usernametaken: true } : null ))
            .pipe(first());
        }
    }

}