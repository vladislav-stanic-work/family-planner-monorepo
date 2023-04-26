import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { EROUTES } from '@family-planner/utils';

import { AuthGuard, UserToken } from './guards/auth.guard';

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate(inject(UserToken), route, state);
};

export const appRoutes: Route[] = [
  {
    path: EROUTES.LOGIN,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/login-feature/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: EROUTES.REGISTER,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/login-feature/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: EROUTES.DASHBOARD,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: EROUTES.USERS,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/users-feature/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  {
    path: `${EROUTES.USERS}/:id`,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/users-feature/user/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: EROUTES.GROUPS,
    canActivate: [canActivateChild],
    loadChildren: () =>
      import('./pages/groups-feature/groups/groups.module').then(
        (m) => m.GroupsModule
      ),
  },
  {
    path: '',
    redirectTo: EROUTES.LOGIN,
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
