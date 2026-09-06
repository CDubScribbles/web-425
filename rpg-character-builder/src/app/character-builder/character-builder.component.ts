import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Character } from '../models/character';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'app-character-builder',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section data-testid="character-form-page">
      <h1>Create a Character</h1>

      <form
        class="w4-panel w4-form"
        data-testid="character-form"
        #characterForm="ngForm"
        (ngSubmit)="createCharacter()"
      >
        <fieldset>
          <legend>Character Details</legend>

          <div class="w4-field">
            <label for="character-name">Name</label>
            <input
              id="character-name"
              name="character-name"
              data-testid="character-name"
              type="text"
              required
              [(ngModel)]="name"
            />
          </div>

          <div class="w4-field">
            <label for="character-class">Class</label>
            <select
              id="character-class"
              name="character-class"
              data-testid="character-class"
              required
              [(ngModel)]="characterClass"
            >
              <option value="" disabled>-- Select a class --</option>
              @for (option of classOptions; track option.id) {
                <option [value]="option.name">{{ option.name }}</option>
              }
            </select>
          </div>

          <div class="w4-field w4-field-compact">
            <label for="character-level">Level</label>
            <input
              id="character-level"
              name="character-level"
              data-testid="character-level"
              type="number"
              min="1"
              max="20"
              step="1"
              inputmode="numeric"
              required
              [(ngModel)]="level"
            />
          </div>

          <label class="w4-choice-card" for="character-veteran">
            <input
              id="character-veteran"
              name="character-veteran"
              type="checkbox"
              data-testid="character-veteran"
              [(ngModel)]="veteran"
            />
            <span><strong>Veteran</strong></span>
          </label>

          <input
            class="w4-btn w4-btn-primary w4-btn-block"
            data-testid="character-submit"
            type="submit"
            value="Create character"
            [disabled]="characterForm.invalid || !isFormValid"
          />
        </fieldset>
      </form>

      @if (characters.length > 0) {
        <ul class="w4-summary-list" data-testid="character-list">
          @for (character of characters; track $index) {
            <li>
              <strong>{{ character.name }}</strong> — {{ character.characterClass }}, Level {{ character.level }}
              @if (character.veteran) { (Veteran) }
              <p>Starting hit points: {{ character.startingHitPoints }}</p>
            </li>
          }
        </ul>
      } @else {
        <p>No characters created yet.</p>
      }
    </section>
  `
})
export class CharacterBuilderComponent {
  readonly classOptions: CharacterClass[] = [
    { id: 'warrior', name: 'Warrior', description: 'A frontline fighter skilled in melee combat and heavy armor.' },
    { id: 'mage', name: 'Mage', description: 'A spellcaster who channels arcane energy to devastating effect.' },
    { id: 'rogue', name: 'Rogue', description: 'A stealthy operative skilled in precision strikes and subterfuge.' }
  ];

  characters: Character[] = [];

  name = '';
  characterClass = '';
  level: number = 1;
  veteran = false;

  get levelIsValid(): boolean {
    return Number.isInteger(this.level) && this.level >= 1 && this.level <= 20;
  }
  get isFormValid(): boolean {
    return this.name.trim().length > 0 && this.characterClass.length > 0 && this.levelIsValid;
  }

  createCharacter(): void {
    if (!this.isFormValid) {
      return;
    }

    const newCharacter: Character = {
      name: this.name,
      characterClass: this.characterClass,
      level: this.level,
      veteran: this.veteran,
      startingHitPoints: 10 + this.level
    };

    this.characters.push(newCharacter);
    this.resetForm();
  }

  private resetForm(): void {
    this.name = '';
    this.characterClass = '';
    this.level = 1;
    this.veteran = false;
  }
}
