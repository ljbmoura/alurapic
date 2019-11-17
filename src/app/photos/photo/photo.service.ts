import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Photo} from './photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private API = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  listFromUser(userName: String): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${this.API}/${userName}/photos`);
  }
}
