import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (user && user.access_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.access_token}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
