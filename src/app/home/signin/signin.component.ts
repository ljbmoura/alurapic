import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component ({
    // Escopo de Página
    // selector: 'ap-signin', -> desnecessário pois nenhuma outra página usará este componente
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit () {
        this.loginForm = this.formBuilder.group( {
            userName: ['', Validators.required]
            , password: ['', Validators.minLength(5)]
        });
    }

}
