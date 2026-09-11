import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let cookieServiceSpy: { check: any };
  let router: Router;

  beforeEach(() => {
    cookieServiceSpy = {
      check: vi.fn().mockReturnValue(false)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    router = TestBed.inject(Router);
  });

  it('should allow activation when the session cookie exists', () => {
    cookieServiceSpy.check.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/builder' } as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect to Sign-In with a returnUrl when unauthenticated', () => {
    cookieServiceSpy.check.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/builder' } as any)
    );

    const expectedTree = router.createUrlTree(['/signin'], {
      queryParams: { returnUrl: '/builder' }
    });

    expect(result?.toString()).toBe(expectedTree.toString());
  });
});
