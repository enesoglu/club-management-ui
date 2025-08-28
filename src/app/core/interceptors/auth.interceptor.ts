import { AuthService } from '../services/auth.service';

import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    const authToken = authService.getAuthToken();

    if (authToken) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
      return next(newReq);
    }
  }

  return next(req);
}
