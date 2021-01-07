import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth-service.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.startAuthentication();

    return new Observable<boolean>((observer) => {
      setTimeout(() => {

        if (this.authService.isLoggedIn)
          observer.next(true);
        else
          observer.next(false);
        observer.complete();
      }, 1000 * 5);
    });
  }
}
