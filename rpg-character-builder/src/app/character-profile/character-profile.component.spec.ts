import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  let component: CharacterProfileComponent;
  let fixture: ComponentFixture<CharacterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('form should be valid when all required fields are filled', () => {
    component.profileForm.controls['backstory'].setValue('Raised near the old forest.');
    component.profileForm.controls['alignment'].setValue('Neutral Good');
    component.profileForm.controls['homeland'].setValue('Whiterun Hold');
    component.skillsArray.at(0).setValue(true);

    expect(component.profileForm.valid).toBeTruthy();
  });

  it('should transform selected skills into labels, not booleans', () => {
    component.profileForm.controls['backstory'].setValue('A wanderer from the old world.');
    component.profileForm.controls['alignment'].setValue('Chaotic Neutral');
    component.profileForm.controls['homeland'].setValue('Night City — Watson District');
    component.skillsArray.at(2).setValue(true);
    component.skillsArray.at(4).setValue(true);

    component.saveProfile();

    const stored = component.profiles[0];
    expect(stored.skills).toEqual(['Netrunning', 'Biotics']);
  });

  it('should append a valid profile and display it in the rendered list', () => {
    component.profileForm.controls['backstory'].setValue('Trained under the old masters.');
    component.profileForm.controls['alignment'].setValue('Lawful Good');
    component.profileForm.controls['homeland'].setValue('The Citadel');
    component.skillsArray.at(0).setValue(true);

    component.saveProfile();
    fixture.detectChanges();

    expect(component.profiles.length).toBe(1);

    const compiled = fixture.nativeElement as HTMLElement;
    const list = compiled.querySelector('[data-testid="profile-list"]');
    expect(list?.textContent).toContain('The Citadel');
    expect(list?.textContent).toContain('Lawful Good');
    expect(list?.textContent).toContain('Swordsmanship');
  });

  it('should reset the form after a successful submission', () => {
    component.profileForm.controls['backstory'].setValue('Just passing through.');
    component.profileForm.controls['alignment'].setValue('True Neutral');
    component.profileForm.controls['homeland'].setValue('Omega Station');
    component.skillsArray.at(1).setValue(true);

    component.saveProfile();

    expect(component.profileForm.value.backstory).toBeNull();
    expect(component.profileForm.value.alignment).toBeNull();
    expect(component.profileForm.value.homeland).toBeNull();
    expect(component.skillsArray.value).toEqual([false, false, false, false, false, false]);
  });
});
