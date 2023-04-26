import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserDetails, IUserUpdate } from '@family-planner/utils';
import { Observable, of, switchMap, take, tap } from 'rxjs';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'fpl-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUserDetails> = of();

  userId = '';
  editEnabled = false;
  showEditUserForm = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      // Add until
      take(1),
      switchMap((params) => {
        this.userId = params['id'];
        const thisUser = localStorage.getItem('user') || '';

        this.editEnabled = this.userId === JSON.parse(thisUser)?._id;
        return this.usersService.getUser(this.userId);
      })
    );
  }

  onToggleEditForm(): void {
    this.showEditUserForm = !this.showEditUserForm;
  }

  onUpdateUser(data: IUserUpdate): void {
    this.usersService
      .updateUser(this.userId, data)
      .pipe(
        tap((newData: IUserDetails) => {
          this.user$ = of(newData);
        })
      )
      .subscribe();
  }
}
