import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EROUTES,
  IGroupList,
  IUserDetails,
  IUserUpdate,
} from '@family-planner/utils';
import { map, Observable, of, switchMap, tap } from 'rxjs';

import { GroupsService } from '../../groups-feature/services/groups.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'fpl-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUserDetails> = of();
  allGroups$: Observable<
    { id: string; name: string; disabled: boolean; preselected: boolean }[]
  > = of();

  userId = '';
  editEnabled = false;
  showEditUserForm = false;

  EROUTES = EROUTES;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
  }

  private getUsers(): void {
    this.user$ = this.route.params.pipe(
      // Add until
      switchMap((params) => {
        this.userId = params['id'];
        const thisUser = localStorage.getItem('user') || '';
        this.editEnabled = this.userId === JSON.parse(thisUser)?.id;
        return this.usersService.getUser(this.userId);
      })
    );
  }

  private getGroups(): void {
    this.allGroups$ = this.groupsService.getGroups().pipe(
      map((groups: IGroupList[]) =>
        groups.map((group: IGroupList) => ({
          id: group.id,
          name: group.name,
          disabled: group.adminId === this.userId,
          preselected: group.memberIds.includes(this.userId),
        }))
      )
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

          this.showEditUserForm = false;
        })
      )
      .subscribe();
  }
}
