import { AuthService } from '../services/auth.service';

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // if logged in, allow
  if (authService.isLoggedIn())
    return true;

  // if not, redirect to the login page
  else {
    void router.navigate(['/login']);
    return false;
  }
};
