import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserToken {}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
  canActivate(currentUser: UserToken, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}
