import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-card',
    templateUrl: './card.component.html'
})
export class CardComponent {
    titulo: string;
    @Input() set title (titulo: string) {
        this.titulo = titulo;
    }

    get title () {
        return this.titulo;
    }
}
