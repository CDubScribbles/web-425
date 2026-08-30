import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiceService {
  roll(sides: number): number {
    if (!Number.isInteger(sides) || sides < 2) {
      throw new RangeError('Sides must be an integer of 2 or greater.');
    }
    return Math.floor(Math.random() * sides) + 1;
  }
}
