import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export interface Feedback {
  rating: number;
  likes: string[];
  recommend: string;
  comments: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <section>
    <form
      class="w4-panel w4-form"
      [formGroup]="feedbackForm"
      (ngSubmit)="leaveFeedback()"
    >
      <div class="w4-field">
        <span class="w4-label" id="rating-label">
          Rate our service *
        </span>
        <div
          class="w4-rating"
          role="radiogroup"
          aria-labelledby="rating-label"
        >
          @for (rating of ratings; track rating) {
            <label [for]="'rating-' + rating" class="w4-rating-option">
              <input
                type="radio"
                [id]="'rating-' + rating"
                [value]="rating"
                formControlName="rating"
              />
              <span>{{ rating }}</span>
            </label>
          }
        </div>
      </div>
      <div class="w4-field">
        <span class="w4-label" id="likes-label">
          What did you like about our service?
        </span>
        <div
          class="w4-choice-group"
          formArrayName="likes"
          aria-labelledby="likes-label"
        >
          @for (control of likesArray.controls; track control; let i = $index) {
            <label [for]="'like-' + i" class="w4-choice">
              <input
                type="checkbox"
                [id]="'like-' + i"
                [formControlName]="i"
              />
              <span>{{ likes[i] }}</span>
            </label>
          }
        </div>
      </div>
      <div class="w4-field w4-field-narrow">
        <label for="recommend">Would you recommend us? *</label>
        <select id="recommend" formControlName="recommend">
          <option [ngValue]="null" disabled>Select an option</option>
          @for (option of recommendedOptions; track option) {
            <option [value]="option">{{ option }}</option>
          }
        </select>
      </div>
      <div class="w4-field">
        <label for="comments">Any additional comments?</label>
        <textarea
          id="comments"
          rows="7"
          formControlName="comments"
        ></textarea>
      </div>
      <input
        class="w4-btn w4-btn-primary w4-btn-block"
        type="submit"
        value="Leave Feedback"
        [disabled]="!feedbackForm.valid"
      />
    </form>
    <div class="w4-grid w4-grid-2">
      @for (feedback of preexistingFeedback; track feedback) {
        <article class="w4-card w4-review-card">
          <div
            class="w4-rating-display"
            [attr.aria-label]="feedback.rating + ' out of 5 stars'"
          >
            <span aria-hidden="true">★</span>
            <strong>{{ feedback.rating }} / 5</strong>
          </div>
          <blockquote>"{{ feedback.comments }}"</blockquote>
          <ul class="w4-inline-list">
            @for (like of feedback.likes; track like) {
              <li>{{ like }}</li>
            }
          </ul>
        </article>
      }
    </div>
  </section>
`
})
export class FeedbackComponent {
  private readonly formBuilder = inject(FormBuilder);

  ratings: number[] = [1, 2, 3, 4, 5];
  recommendedOptions: string[] = ['Yes', 'No'];
  preexistingFeedback: Feedback[] = [];

  likes: string[] = [
    'Service',
    'Quality',
    'Price',
    'Ambience',
    'Other'
  ];

  feedbackForm: FormGroup = this.formBuilder.group({
    rating: [null, Validators.required],
    likes: this.formBuilder.array(
      this.likes.map(() => false)
    ),
    recommend: [null, Validators.required],
    comments: [null]
  });

  get likesArray(): FormArray {
    return this.feedbackForm.get('likes') as FormArray;
  }

  leaveFeedback(): void {
    const selectedValues = this.likesArray.value as boolean[];
    const selectedLikes = this.likes.filter(
      (like, index) => selectedValues[index]
    );

    this.preexistingFeedback.push({
      rating: this.feedbackForm.value.rating,
      likes: selectedLikes,
      recommend: this.feedbackForm.value.recommend,
      comments: this.feedbackForm.value.comments
    });

    alert('Feedback submitted successfully!');

    // Section 7.9's checklist requires "the form resets after submission,"
    // but the leaveFeedback() code shown in 7.8.1.5 never calls reset(), that I could see.
    // Added to satisfy that stated requirement; couldn't find in the text.
    this.feedbackForm.reset({
      rating: null,
      likes: this.likes.map(() => false),
      recommend: null,
      comments: null
    });
  }
}
