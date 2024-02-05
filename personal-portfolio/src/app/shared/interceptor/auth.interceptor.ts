import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getIdToken().pipe(
      switchMap((idToken: string | null) => {
        if (idToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}
