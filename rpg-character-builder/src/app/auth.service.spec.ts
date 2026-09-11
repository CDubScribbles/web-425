import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieServiceSpy: { check: any; set: any; delete: any };

  beforeEach(() => {
    cookieServiceSpy = {
      check: vi.fn().mockReturnValue(false),
      set: vi.fn(),
      delete: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should report unauthenticated when no session cookie exists', () => {
    cookieServiceSpy.check.mockReturnValue(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should set the session cookie when signing in', () => {
    service.signin('adventurer1');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('session_user', 'adventurer1', 1);
  });

  it('should report authenticated once the session cookie is present', () => {
    cookieServiceSpy.check.mockReturnValue(true);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should remove the session cookie when signing out', () => {
    service.signout();
    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('session_user');
  });
});
