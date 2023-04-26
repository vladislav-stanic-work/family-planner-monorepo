import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserDetails } from '@family-planner/utils';
import { Observable, of, switchMap, take } from 'rxjs';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'fpl-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUserDetails> = of();

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      // Add until
      take(1),
      switchMap((params) => this.usersService.getUser(params['id']))
    );
  }
}
