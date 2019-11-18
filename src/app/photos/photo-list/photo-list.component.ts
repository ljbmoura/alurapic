import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

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
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) {
    console.log('construtor de PhotoListComponent executado.');
  }

  ngOnInit(): void {

    this.userName = this.activatedRoute.snapshot.params.userName;
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

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(
        (itensProximaPagina) => {
          this.photos = this.photos.concat(itensProximaPagina);
          if(!itensProximaPagina.length) { this.hasMore = false; }
        }
      )
  }

}
