import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="w4-shell">
      <header class="w4-header">
        <div class="w4-container w4-header-inner">
          <a href="/" class="w4-brand" aria-label="Virtual Taco Stand home">
            <img src="/assets/virtual-taco-stand.svg"
                 alt="Virtual Taco Stand"
                 class="w4-brand-image" />
          </a>
        </div>
        <nav class="w4-navbar" aria-label="Primary navigation">
          <div class="w4-container w4-nav">
            <a class="w4-nav-link" href="/">Home</a>
            <a class="w4-nav-link" href="/menu">Menu</a>
            <a class="w4-nav-link" href="/order">Order</a>
            <a class="w4-nav-link" href="/daily-specials">Daily Specials</a>
            <a class="w4-nav-link" href="/feedback">Feedback</a>
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
export class AppComponent {
  readonly title = 'virtual-taco-stand';
  readonly currentYear = new Date().getFullYear();
}
