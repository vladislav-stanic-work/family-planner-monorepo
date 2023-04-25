import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EROUTES } from '@family-planner/utils';

@Injectable({
  providedIn: 'root',
})
export class UserToken {}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}
  canActivate(
    currentUser: UserToken,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const onLoginPages = (
      [EROUTES.LOGIN, EROUTES.REGISTER] as string[]
    ).includes(state.url.substring(1));

    const user = localStorage.getItem('user');
    if (user === null || !JSON.parse(user)?.token) {
      if (onLoginPages) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }

    if (onLoginPages) {
      this.router.navigate([`${EROUTES.DASHBOARD}`]);
    }

    return true;
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}
