import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filtroLista = '';
  // debounce: Subject<string> = new Subject<string>();
  hasMore = true;
  currentPage = 1;
  userName = '';

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) {
    // tslint:disable-next-line: no-console
    console.debug('construtor de PhotoListComponent executado.');
  }

  ngOnInit(): void {
    console.log('PhotoListComponent: entrou em ngOnInit');
    this.activatedRoute.params.subscribe(
      parametrosRotaAtivada => {
        this.userName = parametrosRotaAtivada['userName']; // ou
        this.photos = this.activatedRoute.snapshot.data['fotos']; // ou .snapshot.data.photos;
        console.log(`PhotoListComponent: recebeu ${this.photos.length} itens.`);
      }
    );
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(
        (itensProximaPagina) => {
          this.filtroLista = '';
          this.photos = this.photos.concat(itensProximaPagina);
          if ( !itensProximaPagina.length) { this.hasMore = false; }
        }
      );
  }

}
