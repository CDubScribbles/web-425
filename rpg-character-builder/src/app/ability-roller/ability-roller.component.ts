import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  template: `
    <section class="w4-panel">
      <h1>Ability Score Roller</h1>
      <p>Die: d{{ sides }}</p>
      <button type="button" data-testid="roll-button" class="w4-btn w4-btn-primary" (click)="rollAbility()">
        Roll ability
      </button>
      @if (result !== undefined) {
        <p data-testid="roll-result">{{ result }}</p>
      }
    </section>
  `
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  sides: number;
  result: number | undefined;

  constructor() {
    const rawSides = Number(this.route.snapshot.paramMap.get('sides'));
    if (!Number.isInteger(rawSides) || rawSides < 2) {
      console.warn('Invalid route value for sides; defaulting to 6.');
      this.sides = 6;
    } else {
      this.sides = rawSides;
    }
  }

  rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}
