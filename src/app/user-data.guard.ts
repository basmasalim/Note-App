import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userDataGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  router.navigate(['signin']);
  return false;
};
