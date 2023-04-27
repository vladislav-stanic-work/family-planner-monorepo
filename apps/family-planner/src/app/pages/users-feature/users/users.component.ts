import { Component, OnInit } from '@angular/core';
import { EROLES, EROUTES, IUser } from '@family-planner/utils';
import { take, tap } from 'rxjs';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'fpl-users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: IUser[] = [];
  displayedColumns: string[] = ['num', 'name', 'email', 'role'];
  thisId = '';

  EROUTES = EROUTES;
  EROLES = EROLES;

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .getUsers()
      .pipe(
        // Add until
        take(1),
        tap((res: IUser[]) => {
          this.dataSource = res;

          this.thisId = JSON.parse(localStorage.getItem('user') || '')?.id;
        })
      )
      .subscribe();
  }
}
