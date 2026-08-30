import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should return a value within the inclusive range', () => {
    for (let i = 0; i < 50; i++) {
      const result = service.roll(6);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  it('should throw RangeError for invalid sides', () => {
    expect(() => service.roll(1)).toThrowError(RangeError);
    expect(() => service.roll(2.5)).toThrowError(RangeError);
  });
});
