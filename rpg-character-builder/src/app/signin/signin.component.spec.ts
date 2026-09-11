import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: { signin: any };
  let routerSpy: { navigate: any };

  function setup(returnUrl: string | null) {
    authServiceSpy = { signin: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap(
                returnUrl ? { returnUrl } : {}
              )
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    setup(null);
    expect(component).toBeTruthy();
  });

  it('should be invalid when the username is under 3 characters', () => {
    setup(null);
    component.signinForm.controls['username'].setValue('ab');
    component.signinForm.controls['accessCode'].setValue('AB1234');
    expect(component.signinForm.valid).toBe(false);
  });

  it('should be invalid when the access code is not exactly 6 alphanumeric characters', () => {
    setup(null);
    component.signinForm.controls['username'].setValue('adventurer1');
    component.signinForm.controls['accessCode'].setValue('AB12');
    expect(component.signinForm.valid).toBe(false);
  });

  it('should be valid with a proper username and access code', () => {
    setup(null);
    component.signinForm.controls['username'].setValue('adventurer1');
    component.signinForm.controls['accessCode'].setValue('AB1234');
    expect(component.signinForm.valid).toBe(true);
  });

  it('should call AuthService.signin with the entered username on submit', () => {
    setup(null);
    component.signinForm.controls['username'].setValue('adventurer1');
    component.signinForm.controls['accessCode'].setValue('AB1234');

    component.signin();

    expect(authServiceSpy.signin).toHaveBeenCalledWith('adventurer1');
  });

  it('should navigate to /builder by default when no returnUrl is present', () => {
    setup(null);
    component.signinForm.controls['username'].setValue('adventurer1');
    component.signinForm.controls['accessCode'].setValue('AB1234');

    component.signin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/builder']);
  });

  it('should navigate to the preserved returnUrl when one is present', () => {
    setup('/classes');
    component.signinForm.controls['username'].setValue('adventurer1');
    component.signinForm.controls['accessCode'].setValue('AB1234');

    component.signin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/classes']);
  });
});
