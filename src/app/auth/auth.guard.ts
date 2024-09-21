import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from '../../../src/app/shared/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionStorageService: SessionStorageService, private router: Router) {}

  canActivate(): boolean {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
