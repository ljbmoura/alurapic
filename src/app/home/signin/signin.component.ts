import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component ({
    // Escopo de Página
    // selector: 'ap-signin', -> desnecessário pois nenhuma outra página usará este componente
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit () {
        this.loginForm = this.formBuilder.group( {
            userName: ['flavio', Validators.required]
            , password: ['123', Validators.minLength(3)]
        });
    }

    login () {
        console.debug('submeteu');
        this.authService.authenticate (
            this.loginForm.get('userName').value
            , this.loginForm.get('password').value)
            .subscribe(
                (usuarioAutenticado) => {
                    console.log(`autenticação bem sucedida: ${JSON.stringify(usuarioAutenticado)}`);
                }
                , (erro: HttpErrorResponse) => {
                    console.error(JSON.stringify(erro));
                    alert(`Falha na autenticação: ${erro.error.message}`);
                }
            )
    }

}
