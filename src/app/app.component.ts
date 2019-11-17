import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({ // Decorator
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // classe ECMAScript6
  title = 'alurapic';

  photos: Object[] = [];

  constructor(http: HttpClient ) {
    http
      .get<Object[]>('http://localhost:3000/flavio/photos')
      .subscribe( // Observable do RxJS
         (dadosObservados) => { this.photos = dadosObservados; }
         , (erroObservado) => { console.error(erroObservado.message); }
      );
    console.log(http);
  }
}
