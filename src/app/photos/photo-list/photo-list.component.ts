import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = 'valor inicial';

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) {
    console.log('construtor de PhotoListComponent executado.');
  }

  ngOnInit(): void {

    const userName = this.activatedRoute.snapshot.params.userName;
    this.photoService
      .listFromUser(userName)
      .subscribe( // Observable do RxJS
        (dadosObservados) => { this.photos = dadosObservados;
          console.log(`photoService.listFromUser retornou ${this.photos.length} itens.`); }
        , (erroObservado) => { console.error(erroObservado.message); }
      );
  }

}
