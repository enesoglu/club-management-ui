import { AuthService } from '../services/auth.service';

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // if logged in, redirect to /login from /members
  if (authService.isLoggedIn()) {
    void router.navigate(['/members']);
    return false;
  }

  else
    return true;

};
