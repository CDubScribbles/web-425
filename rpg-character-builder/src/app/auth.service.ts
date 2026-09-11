import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly cookieService = inject(CookieService);
  private static readonly sessionKey = 'session_user';

  isAuthenticated(): boolean {
    return this.cookieService.check(AuthService.sessionKey);
  }

  signin(username: string): void {
    this.cookieService.set(AuthService.sessionKey, username, 1);
  }

  signout(): void {
    this.cookieService.delete(AuthService.sessionKey);
  }
}
