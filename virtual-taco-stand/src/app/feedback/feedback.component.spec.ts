import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.feedbackForm.valid).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.feedbackForm.controls['comments'].setValue('Great service!');
    expect(component.feedbackForm.valid).toBeTruthy();
  });

  it('should call leaveFeedback when the form is submitted', () => {
    spyOn(component, 'leaveFeedback');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.leaveFeedback).toHaveBeenCalled();
  });

  it('should store selected likes as labels, not booleans', () => {
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.likesArray.at(0).setValue(true);
    component.likesArray.at(2).setValue(true);

    component.leaveFeedback();

    const stored = component.preexistingFeedback[0];
    expect(stored.likes).toEqual(['Service', 'Price']);
  });

  it('should reset the form after successful submission', () => {
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.feedbackForm.controls['comments'].setValue('Great service!');
    component.likesArray.at(1).setValue(true);

    component.leaveFeedback();

    expect(component.feedbackForm.value.rating).toBeNull();
    expect(component.feedbackForm.value.recommend).toBeNull();
    expect(component.feedbackForm.value.comments).toBeNull();
    expect(component.likesArray.value).toEqual([false, false, false, false, false]);
  });
});
