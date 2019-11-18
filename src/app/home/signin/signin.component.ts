import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';

@Component ({
    // Escopo de Página
    // selector: 'ap-signin', -> desnecessário pois nenhuma outra página usará este componente
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder
        , private authService: AuthService
        , private router: Router) {}

    ngOnInit () {
        this.loginForm = this.formBuilder.group( {
            userName: ['flavio', Validators.required]
            , password: ['123', Validators.minLength(3)]
        });
    }

    login () {
        const nomeUsuario: string =
            // this.loginForm.get('userName').value;
            this.userNameInput.nativeElement.value;

        this.authService.authenticate (
            nomeUsuario
            , this.loginForm.get('password').value)
        .subscribe(
            (usuarioAutenticado) => {
                console.log(`autenticação bem sucedida: ${JSON.stringify(usuarioAutenticado)}`);
                // this.router.navigateByUrl('user/' + nomeUsuario);
                this.router.navigate(['user', nomeUsuario]);
            }
            , (erroAuteticacao: HttpErrorResponse) => {
                console.error(erroAuteticacao);
                alert(`Falha na autenticação: ${erroAuteticacao.error.message}`);
                this.loginForm.reset ();
                this.userNameInput.nativeElement.focus();
            }
        )
    }

}
