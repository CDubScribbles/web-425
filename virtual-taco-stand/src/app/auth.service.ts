import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  empId: number;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users: User[] = [
    { empId: 1, email: 'wizardlywand@hogwarts.com', password: 'Alohomora123' },
  ];

  private readonly authState = new BehaviorSubject<boolean>(false);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  getAuthState() {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const user = this.users.find(
      candidate =>
        candidate.email === email &&
        candidate.password === password
    );

    if (user) {
      this.cookieService.set('session_user', email, 1);
      this.authState.next(true);
      return true;
    }

    this.authState.next(false);
    return false;
  }

  signout(): void {
    this.cookieService.deleteAll();
    this.authState.next(false);
    this.router.navigate(['/signin']).then(() => {});
  }
}
