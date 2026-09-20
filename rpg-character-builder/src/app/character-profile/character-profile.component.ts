import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterProfile, ProfileOption } from '../models/character-profile';

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <section>
    <h1>Character Profile</h1>

    <form
      class="w4-panel w4-form"
      data-testid="profile-form"
      [formGroup]="profileForm"
      (ngSubmit)="saveProfile()"
    >
      <div class="w4-field">
        <label for="backstory">Backstory *</label>
        <textarea
          id="backstory"
          data-testid="backstory"
          rows="5"
          formControlName="backstory"
        ></textarea>
      </div>

      <div class="w4-field">
        <span class="w4-label" id="alignment-label">Alignment *</span>
        <div
          class="w4-choice-group"
          data-testid="alignment-group"
          role="radiogroup"
          aria-labelledby="alignment-label"
        >
          @for (option of alignmentOptions; track option) {
            <label [for]="'alignment-' + option" class="w4-choice">
              <input
                type="radio"
                [id]="'alignment-' + option"
                [value]="option"
                formControlName="alignment"
              />
              <span>{{ option }}</span>
            </label>
          }
        </div>
      </div>

      <div class="w4-field">
        <span class="w4-label" id="skills-label">Skills *</span>
        <div
          class="w4-choice-group"
          data-testid="skill-options"
          formArrayName="skills"
          aria-labelledby="skills-label"
        >
          @for (control of skillsArray.controls; track control; let i = $index) {
            <label [for]="'skill-' + i" class="w4-choice">
              <input
                type="checkbox"
                [id]="'skill-' + i"
                [formControlName]="i"
              />
              <span>{{ skillOptions[i].label }}</span>
            </label>
          }
        </div>
      </div>

      <div class="w4-field">
        <label for="homeland">Homeland *</label>
        <select id="homeland" data-testid="homeland" formControlName="homeland">
          <option [ngValue]="null" disabled>Select a homeland</option>
          @for (option of homelandOptions; track option.id) {
            <option [value]="option.label">{{ option.label }}</option>
          }
        </select>
      </div>

      <input
        class="w4-btn w4-btn-primary w4-btn-block"
        data-testid="profile-submit"
        type="submit"
        value="Save Profile"
        [disabled]="!profileForm.valid"
      />
    </form>

    @if (profiles.length > 0) {
      <ul class="w4-summary-list" data-testid="profile-list">
        @for (profile of profiles; track $index) {
          <li>
            <strong>{{ profile.homeland }}</strong> — {{ profile.alignment }}
            <p>Skills: {{ profile.skills.join(', ') }}</p>
            <p>{{ profile.backstory }}</p>
          </li>
        }
      </ul>
    } @else {
      <p>No profiles saved yet.</p>
    }
  `
})
export class CharacterProfileComponent {
  private readonly formBuilder = inject(FormBuilder);

  skillOptions: ProfileOption[] = [
    { id: 'swordsmanship', label: 'Swordsmanship' },
    { id: 'alchemy', label: 'Alchemy' },
    { id: 'netrunning', label: 'Netrunning' },
    { id: 'gunplay', label: 'Gunplay' },
    { id: 'biotics', label: 'Biotics' },
    { id: 'techEngineering', label: 'Tech Engineering' }
  ];

  homelandOptions: ProfileOption[] = [
    { id: 'whiterun', label: 'Whiterun Hold' },
    { id: 'solitude', label: 'Solitude' },
    { id: 'watson', label: 'Night City — Watson District' },
    { id: 'pacifica', label: 'Night City — Pacifica' },
    { id: 'citadel', label: 'The Citadel' },
    { id: 'omega', label: 'Omega Station' }
  ];

  alignmentOptions: string[] = [
    'Lawful Good',
    'Neutral Good',
    'Chaotic Good',
    'Lawful Neutral',
    'True Neutral',
    'Chaotic Neutral',
    'Lawful Evil',
    'Neutral Evil',
    'Chaotic Evil'
  ];

  profiles: CharacterProfile[] = [];

  profileForm: FormGroup = this.formBuilder.group({
    backstory: [null, Validators.required],
    alignment: [null, Validators.required],
    skills: this.formBuilder.array(
      this.skillOptions.map(() => false)
    ),
    homeland: [null, Validators.required]
  });

  get skillsArray(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  saveProfile(): void {
    const selectedValues = this.skillsArray.value as boolean[];
    const selectedSkills = this.skillOptions
      .filter((option, index) => selectedValues[index])
      .map(option => option.label);

    this.profiles.push({
      backstory: this.profileForm.value.backstory,
      alignment: this.profileForm.value.alignment,
      skills: selectedSkills,
      homeland: this.profileForm.value.homeland
    });

    this.profileForm.reset({
      backstory: null,
      alignment: null,
      skills: this.skillOptions.map(() => false),
      homeland: null
    });
  }
}

