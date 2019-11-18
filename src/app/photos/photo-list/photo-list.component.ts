import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';

@Component({
  // tslint:disable-next-line: component-selector
  // selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter = '';
  debounce: Subject<string> = new Subject<string>();

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('construtor de PhotoListComponent executado.');
  }

  ngOnInit(): void {

    this.photos = this.activatedRoute.snapshot.data['fotos']; // ou .snapshot.data.photos;
    console.log(`this.photos recebeu ${this.photos.length} itens.`);

    // https://rxjs-dev.firebaseapp.com/guide/subject
    this.debounce
      .pipe(debounceTime(400))
      .subscribe( {
        next: (novoFiltro: string) => {
          console.log(novoFiltro ? `novo filtro '${novoFiltro}' ativo` : 'nenhum filtro ativo');
          this.filter = novoFiltro;
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
