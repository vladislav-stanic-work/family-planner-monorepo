import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EROUTES } from '@family-planner/utils';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'fpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'family-planner';
  showMenu = false;

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

    this.router.navigate([`/${event}`]);
  }
}
