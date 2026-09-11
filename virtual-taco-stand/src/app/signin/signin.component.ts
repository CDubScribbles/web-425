import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <p class="w4-eyebrow">Welcome back</p>
      <h1>Sign In</h1>

      <form
        [formGroup]="signinForm"
        (ngSubmit)="signin()"
        class="w4-panel w4-form"
      >
        <div class="w4-field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            autocomplete="username"
          />
          @if (
            signinForm.controls['email'].touched &&
            signinForm.controls['email'].hasError('required')
          ) {
            <small class="w4-error">Email is required.</small>
          }
          @if (
            signinForm.controls['email'].touched &&
            signinForm.controls['email'].hasError('email')
          ) {
            <small class="w4-error">Invalid email address.</small>
          }
        </div>

        <div class="w4-field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            autocomplete="current-password"
          />
        </div>

        <input
          class="w4-btn w4-btn-primary w4-btn-block"
          type="submit"
          value="Sign In"
          [disabled]="!signinForm.valid"
        />
      </form>
    </section>
  `
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  signinForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    ],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
      ])
    ]
  });

  signin(): void {
    const email = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;

    if (this.authService.signin(email, password)) {
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigate([returnUrl]);
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
}
