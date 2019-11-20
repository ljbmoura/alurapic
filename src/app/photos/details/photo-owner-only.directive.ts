import { Directive, Input, ElementRef, OnInit, Renderer, Renderer2, OnDestroy } from '@angular/core';
import { Photo } from '../photo/photo';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/core/user/user';
import { tap } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit, OnDestroy {
    @Input() photoOwner: Photo;
    x: any;

    constructor(
        private elementoDOM: ElementRef<HTMLSpanElement>
        , private gestor: UserService
        , private renderer: Renderer2
        ) {}

    ngOnInit(): void {
        const usuarioObserver = {
            next: (usuario: User) => {
                // tslint:disable-next-line: no-console
                console.debug('observador do usuário next');
                if ( !usuario || this.photoOwner.userId !== usuario.id) {
                    this.renderer.setStyle(this.elementoDOM.nativeElement, 'display', 'none');
                    //                    this.elementoDOM.nativeElement.style.setProperty('display', 'none');
                }
            }
            , error: (err: any) => {
                console.error(err);
            }
            , completed: () => {
                // tslint:disable-next-line: no-console
                console.debug('observador do usuário completou');
            }
        };
        this.x = this.gestor.getUser()
        .subscribe(usuarioObserver);
    }

    ngOnDestroy(): void {
        this.x.unsubscribe();
    }
}
