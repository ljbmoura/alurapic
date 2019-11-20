import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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

  upload(description: string, allowComments: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description',  description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', arquivo);
    return this.http.post(this.API + '/photos/upload', formData);
  }

  findById(photoId: number) {
    return this.http.get<Photo> (`${this.API}/photos/${photoId}`);
  }
}
