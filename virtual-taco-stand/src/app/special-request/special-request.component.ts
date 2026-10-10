import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpecialRequest, SpecialRequestService } from './special-request.service';

@Component({
  selector: 'app-special-request',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .w4-detail-list { gap: 0.9rem; margin-bottom: 1rem; font-size: 1rem; }
    .w4-detail-list p { display: block; }
    .w4-detail-list span { display: block; margin-top: 0.15rem; text-align: left; font-size: 1.1rem; }
    #submittedRequest { font-size: 1.1rem; }
  `],
  template: `
    <section>
      <p class="w4-eyebrow">Made exactly your way</p>
      <h1>Special Request</h1>
      <p class="w4-page-intro">Tell us about allergies, dietary needs, or anything else we should know before we make your tacos.</p>

      <div class="w4-stack">
        <form class="w4-panel w4-form" #requestForm="ngForm" (ngSubmit)="onSubmit()">
          <div class="w4-section-heading">
            <span class="w4-step">01</span>
            <div>
              <h2>Your request</h2>
              <p>Complete the form below and submit it.</p>
            </div>
          </div>

          <fieldset>
            <legend>Special Request</legend>

            <div class="w4-field">
              <label for="customerName">Customer Name</label>
              <input type="text" id="customerName" name="customerName" required [(ngModel)]="draft.customerName" />
            </div>

            <div class="w4-field">
              <label for="requestText">Allergies, dietary needs, or other requests</label>
              <textarea
                id="requestText"
                name="requestText"
                rows="5"
                required
                [maxlength]="maxRequestLength"
                [(ngModel)]="draft.requestText"
              ></textarea>
              <p class="w4-field-hint">Up to {{ maxRequestLength }} characters.</p>
            </div>

            <div class="w4-field w4-field-narrow">
              <label for="spiceLevel">Spice Level</label>
              <select id="spiceLevel" name="spiceLevel" [(ngModel)]="draft.spiceLevel">
                @for (level of spiceLevels; track level) {
                  <option [value]="level">{{ level }}</option>
                }
              </select>
            </div>

            <input
              class="w4-btn w4-btn-primary w4-btn-block"
              type="submit"
              value="Submit Request"
              [disabled]="requestForm.invalid"
            />
          </fieldset>
        </form>

        <div class="w4-panel">
          <div class="w4-section-heading">
            <span class="w4-step">02</span>
            <div>
              <h2>Your submitted request</h2>
              <p>This is what we have on file for your order.</p>
            </div>
          </div>

          @if (submitted) {
            <div class="w4-detail-list">
              <p>Name <span>{{ submitted.customerName }}</span></p>
              <p>Spice Level <span>{{ submitted.spiceLevel }}</span></p>
            </div>
            <div class="w4-form-section">
              <span class="w4-label">Request</span>
              <p id="submittedRequest">{{ submitted.requestText }}</p>
            </div>
          } @else {
            <div class="w4-empty-state">
              <p>No special request has been submitted yet.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SpecialRequestComponent {
  private readonly specialRequests = inject(SpecialRequestService);

  readonly spiceLevels = ['Mild', 'Medium', 'Hot'];
  readonly maxRequestLength = 400;

  get draft(): SpecialRequest {
    return this.specialRequests.draft;
  }

  get submitted(): SpecialRequest | null {
    return this.specialRequests.submitted;
  }

  onSubmit(): void {
    this.specialRequests.submit();
  }
}
