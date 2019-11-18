import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive ({
    // tslint:disable-next-line: directive-selector
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() percentual = '60%';
    constructor (private el: ElementRef
        , private render: Renderer2) {}

    @HostListener ('mouseover')
    darkenOnMouseOver () {
        // console.log('mouse over');
        this.render.setStyle(
            this.el.nativeElement
            , 'filter', `brightness(${this.percentual})`);
    }

    @HostListener ('mouseleave')
    darkenOffMouseLeave () {
        this.render.setStyle (
            this.el.nativeElement
            , 'filter', 'brightness(100%)');
    }

}
