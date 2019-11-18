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
