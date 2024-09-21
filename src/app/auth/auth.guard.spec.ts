import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SessionStorageService } from '../../../src/app/shared/services/session-storage.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let sessionStorageService: SessionStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: SessionStorageService, useValue: { getItem: () => 'dummyUserId' } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    sessionStorageService = TestBed.inject(SessionStorageService);
    router = TestBed.inject(Router);
  });

  it('Debe ser creado', () => {
    expect(authGuard).toBeTruthy();
  });
});
