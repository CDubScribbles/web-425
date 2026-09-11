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
      <h1>Sign In</h1>

      <form
        data-testid="signin-form"
        [formGroup]="signinForm"
        (ngSubmit)="signin()"
        class="w4-panel w4-form"
      >
        <div class="w4-field">
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            data-testid="username"
            type="text"
            formControlName="username"
          />
          @if (
            signinForm.controls['username'].touched &&
            signinForm.controls['username'].hasError('required')
          ) {
            <small data-testid="username-error" class="w4-error">Username is required.</small>
          }
          @if (
            signinForm.controls['username'].touched &&
            signinForm.controls['username'].hasError('minlength')
          ) {
            <small data-testid="username-error" class="w4-error">Username must be at least 3 characters.</small>
          }
        </div>

        <div class="w4-field">
          <label for="access-code">Access Code</label>
          <input
            id="access-code"
            name="access-code"
            data-testid="access-code"
            type="text"
            formControlName="accessCode"
          />
          @if (
            signinForm.controls['accessCode'].touched &&
            signinForm.controls['accessCode'].hasError('required')
          ) {
            <small data-testid="access-code-error" class="w4-error">Access code is required.</small>
          }
          @if (
            signinForm.controls['accessCode'].touched &&
            signinForm.controls['accessCode'].hasError('pattern')
          ) {
            <small data-testid="access-code-error" class="w4-error">Access code must be exactly 6 letters or numbers.</small>
          }
        </div>

        <input
          data-testid="signin-submit"
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
    username: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    ],
    accessCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{6}$/)
      ])
    ]
  });

  signin(): void {
    const username = this.signinForm.controls['username'].value;
    this.authService.signin(username);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/builder';
    this.router.navigate([returnUrl]);
  }
}
