import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="w4-shell">
      <header class="w4-header">
        <div class="w4-container w4-header-inner">
          <a href="/" class="w4-brand" aria-label="Virtual Taco Stand home">
            <img src="/assets/virtual-taco-stand.svg"
                 alt="Virtual Taco Stand"
                 class="w4-brand-image" />
          </a>
          <div class="w4-account">
            @if (email) {
              <div class="w4-account-copy">
                <span class="w4-account-label">Signed in as</span>
                <span class="w4-account-value">{{ email }}</span>
              </div>
              <button type="button" class="w4-btn" (click)="signout()">Sign Out</button>
            } @else {
              <a class="w4-btn" routerLink="/signin">Sign In</a>
            }
          </div>
        </div>
        <nav class="w4-navbar" aria-label="Primary navigation">
          <div class="w4-container w4-nav">
            <a class="w4-nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            <a class="w4-nav-link" routerLink="/menu" routerLinkActive="active">Menu</a>
            <a class="w4-nav-link" routerLink="/order" routerLinkActive="active">Order</a>
            <a class="w4-nav-link" routerLink="/daily-specials" routerLinkActive="active">Daily Specials</a>
            <a class="w4-nav-link" routerLink="/feedback" routerLinkActive="active">Feedback</a>
          </div>
        </nav>
      </header>

      <main id="main-content" class="w4-container w4-main">
        <h1 class="w4-sr-only">Hello, {{ title }}</h1>
        <router-outlet />
      </main>

      <footer class="w4-footer">
        <div class="w4-container w4-footer-inner">
          <div>
            <p class="w4-footer-brand">Virtual Taco Stand</p>
            <p class="w4-footer-copy">
              Downtown flavor, made fresh around the clock.
            </p>
          </div>
          <nav class="w4-footer-nav" aria-label="Footer navigation">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/order">Order</a>
            <a href="/daily-specials">Daily Specials</a>
            <a href="/feedback">Feedback</a>
          </nav>
          <p class="w4-footer-copyright">
            &copy; {{ currentYear }} Virtual Taco Stand
          </p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);

  readonly title = 'virtual-taco-stand';
  readonly currentYear = new Date().getFullYear();
  email?: string;

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(isAuthenticated => {
      this.email = isAuthenticated
        ? this.cookieService.get('session_user')
        : undefined;
    });
  }

  signout(): void {
    this.authService.signout();
  }
}
