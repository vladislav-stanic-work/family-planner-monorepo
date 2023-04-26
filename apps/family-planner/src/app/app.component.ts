import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EROUTES, IUserDetails } from '@family-planner/utils';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'fpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  menuNote = '';
  showMenu = false;
  user: IUserDetails = {} as IUserDetails;

  menuLinks = [
    {
      title: 'Users',
      value: EROUTES.USERS,
    },
    {
      title: 'Groups',
      value: EROUTES.GROUPS,
    },
    {
      title: 'My Profile',
      value: `${EROUTES.USERS}/:id` as EROUTES.USERS,
    },
    {
      title: 'Logout',
      value: EROUTES.LOGOUT,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd),
        tap((event: NavigationEnd) => {
          const onLoginPages = (
            ['', EROUTES.LOGIN, EROUTES.REGISTER] as string[]
          ).includes(event.url.substring(1));

          this.showMenu = !onLoginPages;

          if (!onLoginPages) {
            this.user = JSON.parse(localStorage.getItem('user') || '');
            this.menuNote = `Logged in as ${this.user?.name}`;
          }
        })
      )
      .subscribe();
  }

  onMenuClick(event: EROUTES) {
    if (event === EROUTES.LOGOUT) {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      return;
    }

    if (event === `${EROUTES.USERS}/:id`) {
      this.router.navigate([`/${EROUTES.USERS}/${this.user._id}`]);
      return;
    }

    this.router.navigate([`/${event}`]);
  }
}
