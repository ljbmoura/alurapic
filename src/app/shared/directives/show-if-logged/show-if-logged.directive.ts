import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private elementoDOM: ElementRef<any>
        , private gestor: UserService
        , private renderer: Renderer2
        ) {}

    ngOnInit(): void {
        // tslint:disable-next-line: no-unused-expression
        !this.gestor.isLoggeg() && this.renderer.setStyle(this.elementoDOM.nativeElement, 'display', 'none');
    }
}
