import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Photo } from './photo';
import { Observable, of, throwError } from 'rxjs';
import { PhotoComment } from './photoComment';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(userName: String): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${API}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const queryString = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(API + '/' + userName + '/photos', { params: queryString });
  }

  upload(description: string, allowComments: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', arquivo);
    return this.http.post(API + '/photos/upload', formData
      , {
        observe: 'events'
        , reportProgress: true
      });
  }

  findById(photoId: number) {
    return this.http.get<Photo>(
      `${API}/photos/${photoId}`);
  }

  remove(photoId: number) {
    return this.http.delete(
      `${API}/photos/${photoId}`);
  }

  getComments(photoId: number): Observable<PhotoComment[]> {
    return this.http.get<PhotoComment[]>(
      `${API}/photos/${photoId}/comments`);
  }

  addComment(photoId: number, commentText: string): Observable<PhotoComment> {
    return this.http.post<PhotoComment>(
      API + '/photos/' + photoId + '/comments',
      { commentText });
  }

  like(photoId: number): Observable<Boolean> {
    return this.http.post(
      `${API}/photos/${photoId}/like`
      , {}
      , { observe: 'response' } // observador que viabiliza acesso a resposta http
    )
      .pipe(map(() => true))
      .pipe(catchError((err: HttpErrorResponse) => {
        return err.status === 304 ? of(false) : throwError(err);
      })
      );
  }
}
