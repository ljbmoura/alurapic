import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { SignUpService } from './signup.service';
import { UsuarioReg } from './usuarioReg';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Component({
    // selector: denecessário pois este compenente terá escopo de página
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{

    signupForm: FormGroup;
    @ViewChild ('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor( private formBuilder: FormBuilder
        , private singupService: SignUpService
        , private platformDetector: PlatformDetectorService) {
    }

    signup () {
        const novoUsuario = this.signupForm.getRawValue() as UsuarioReg;
        this.singupService.signup(novoUsuario);
    }

    ngOnInit(): void {
        if (this.platformDetector.isPlatformBrowser()) {
            this.emailInput.nativeElement.focus();
        }

        this.signupForm = this.formBuilder.group({
            email: ['', [
                Validators.required
                , Validators.email]
            ]
            , fullName: ['', [
                Validators.required
                , Validators.minLength(2)
                , Validators.maxLength(40) ]
            ]
            , userName: ['', [
                Validators.required
                , Validators.minLength(2)
                , Validators.maxLength(30)
                , lowerCaseValidator ]
                , this.singupService.checkUserNameTakenValidator()
            ]
            , password: ['', [
                Validators.required
                , Validators.minLength(8),
                , Validators.maxLength(14) ]
            ]
        });
    }
}
