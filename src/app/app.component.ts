import { Component } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';
import { Photo } from './photos/photo/photo';

@Component({ // Decorator
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // classe ECMAScript6
  title = 'alurapic';

  photos: Photo[] = [];

  constructor(service: PhotoService ) {
      service
        .listFromUser('flavio')
        .subscribe( // Observable do RxJS
          (dadosObservados) => { this.photos = dadosObservados; }
          , (erroObservado) => { console.error(erroObservado.message); }
      );

  }
}
