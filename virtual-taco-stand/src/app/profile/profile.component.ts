import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <button type="button" (click)="loadProfile()">Load profile</button>
    @if (message) {
      <p role="status">{{ message }}</p>
    }
  `
})
export class ProfileComponent {
  message = '';

  loadProfile(): void {
    try {
      throw new Error('Profile data is unavailable.');
    } catch (error: unknown) {
      console.error(error);
      this.message = 'We could not load the profile. Please try again.';
    }
  }
}
