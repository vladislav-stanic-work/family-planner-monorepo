import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Route,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthGuard, UserToken } from './guards/auth.guard';

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate(inject(UserToken), route, state);
};

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/login-feature/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/login-feature/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    pathMatch: 'full',
  },
];
