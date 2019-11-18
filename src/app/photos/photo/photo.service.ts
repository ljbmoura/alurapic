import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Photo} from './photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private API = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // https://angular.io/api/common/http/HttpClient#get

  listFromUser(userName: String): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${this.API}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const queryString = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(this.API + '/' + userName + '/photos', {params: queryString});
  }
}
