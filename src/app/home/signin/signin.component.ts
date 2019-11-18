import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Component ({
    // Escopo de Página
    // selector: 'ap-signin', -> desnecessário pois nenhuma outra página usará este componente
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    executandoNoNavagador: boolean;

    constructor(
        private formBuilder: FormBuilder
        , private authService: AuthService
        , private router: Router
        , private platformDetector: PlatformDetectorService) {}

    ngOnInit () {
        this.loginForm = this.formBuilder.group( {
            userName: ['flavio', Validators.required]
            , password: ['123', Validators.minLength(3)]
        });
        this.executandoNoNavagador = this.platformDetector.isPlatformBrowser();
        if (this.executandoNoNavagador) {
            this.userNameInput.nativeElement.focus();
        }
    }

    login () {

        const nomeUsuario: string = this.executandoNoNavagador ?
            this.userNameInput.nativeElement.value : this.loginForm.get('userName').value;

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

                // executandoNoNavagador && this.userNameInput.nativeElement.focus();
                if (this.executandoNoNavagador) {
                    this.userNameInput.nativeElement.focus();
                }
            }
        );
    }

}
