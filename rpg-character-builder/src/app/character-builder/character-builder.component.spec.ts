import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the name property via two-way binding when the input changes', () => {
    const input = fixture.debugElement.query(By.css('#character-name')).nativeElement as HTMLInputElement;

    input.value = 'Aria';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('Aria');
  });

  it('should not store a character when required fields are missing', () => {
    component.name = '';
    component.characterClass = 'Warrior';
    component.level = 5;

    component.createCharacter();

    expect(component.characters.length).toBe(0);
  });

  it('should store a valid character with correctly calculated starting hit points', () => {
    component.name = 'Aria';
    component.characterClass = 'Wizard';
    component.level = 3;
    component.veteran = true;

    component.createCharacter();

    const stored = component.characters[0];
    expect(stored.name).toBe('Aria');
    expect(stored.characterClass).toBe('Wizard');
    expect(stored.level).toBe(3);
    expect(stored.veteran).toBe(true);
    expect(stored.startingHitPoints).toBe(13);
  });

  it('should reset the form model after a successful submission', () => {
    component.name = 'Aria';
    component.characterClass = 'Wizard';
    component.level = 3;
    component.veteran = true;

    component.createCharacter();

    expect(component.name).toBe('');
    expect(component.characterClass).toBe('');
    expect(component.level).toBe(1);
    expect(component.veteran).toBe(false);
  });
});
