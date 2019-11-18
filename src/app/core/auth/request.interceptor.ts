import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenGestor: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenGestor.hasToken()) {
            const token = this.tokenGestor.getToken();
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            });
        }
        return next.handle(req);
    }

}
