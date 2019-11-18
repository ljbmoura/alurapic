import { Component, OnDestroy, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-search'
    , templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  // https://rxjs-dev.firebaseapp.com/guide/subject
    debounce: Subject<string> =  new Subject<string>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() digitacao = new EventEmitter<string>();
    @Input() filtroAtivo = '';

    constructor() {}

    ngOnInit(): void {
      this.debounce
        .pipe(debounceTime(400))
        .subscribe( {
          next: (novoFiltro: string) => {
              this.filtroAtivo = novoFiltro;
              this.digitacao.emit(this.filtroAtivo);
              console.log(this.filtroAtivo ? `novo filtro '${this.filtroAtivo}' recebido e emitido` : 'nenhum filtro ativo');
          },
          error: (erro) => {
            console.error(erro);
          }
        }
      );
      // this.debounce.next('F');
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }


}
