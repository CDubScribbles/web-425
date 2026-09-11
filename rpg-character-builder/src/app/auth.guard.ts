import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);

  if (cookieService.check('session_user')) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/signin'], {
    queryParams: { returnUrl: state.url }
  });
};
