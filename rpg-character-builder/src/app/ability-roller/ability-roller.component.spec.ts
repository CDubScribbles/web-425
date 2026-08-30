import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  it('should call a spied DiceService when rolling', () => {
    const diceServiceSpy = { roll: vi.fn().mockReturnValue(4) };

    TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        { provide: DiceService, useValue: diceServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ sides: '6' }) } } }
      ]
    });

    const fixture = TestBed.createComponent(AbilityRollerComponent);
    const component = fixture.componentInstance;

    component.rollAbility();

    expect(diceServiceSpy.roll).toHaveBeenCalledWith(6);
    expect(component.result).toBe(4);
  });

  it('should default to 6 and warn once when route sides is invalid', () => {
    vi.spyOn(console, 'warn');

    TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        { provide: DiceService, useValue: { roll: vi.fn() } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ sides: 'not-a-number' }) } } }
      ]
    });

    const fixture = TestBed.createComponent(AbilityRollerComponent);
    const component = fixture.componentInstance;

    expect(component.sides).toBe(6);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
