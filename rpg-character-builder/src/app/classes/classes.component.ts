import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'app-classes',
  imports: [RouterLink],
  template: `
    <section data-testid="classes-page">
      <h1>Character Classes</h1>
      <ul data-testid="class-list">
        @for (characterClass of classes; track characterClass.id) {
          <li>
            <a [routerLink]="['/classes', characterClass.id]">
              {{ characterClass.name }}
            </a>
            <p>{{ characterClass.description }}</p>
          </li>
        }
      </ul>
    </section>
  `,
})
export class ClassesComponent {
  readonly classes: CharacterClass[] = [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'A frontline fighter skilled in melee combat and heavy armor.'
    },
    {
      id: 'mage',
      name: 'Mage',
      description: 'A spellcaster who channels arcane energy to devastating effect.'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'A stealthy operative skilled in precision strikes and subterfuge.'
    }
  ];
}
