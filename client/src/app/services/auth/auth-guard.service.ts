import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivateChild, CanActivate, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canLoad(route: Route): Observable<boolean> {
        return this.authObservable().pipe(
            take(1)
        );
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authObservable();
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authObservable();
    }

    authObservable(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            if (this.authService.isAuthenticated()) {
                observer.next(true);
            } else {
                this.router.navigate(['/login']);
                observer.next(false);
            }
        });
    }
}
