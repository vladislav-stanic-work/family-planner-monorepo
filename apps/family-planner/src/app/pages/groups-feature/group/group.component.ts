import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EROUTES, IGroupDetails, IUserUpdate } from '@family-planner/utils';
import { Observable, of, switchMap, take } from 'rxjs';

import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'fpl-group-page',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  group$: Observable<IGroupDetails> = of();

  userId = '';
  editEnabled = false;
  showEditGroupForm = false;

  EROUTES = EROUTES;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    this.group$ = this.route.params.pipe(
      // Add until
      take(1),
      switchMap((params) => {
        this.userId = params['id'];
        const thisUser = localStorage.getItem('user') || '';
        this.editEnabled = this.userId === JSON.parse(thisUser)?.id;
        return this.groupsService.getGroup(this.userId);
      })
    );
  }

  onToggleEditForm(): void {
    this.showEditGroupForm = !this.showEditGroupForm;
  }

  onUpdateUser(data: IUserUpdate): void {
    // this.usersService
    //   .updateUser(this.userId, data)
    //   .pipe(
    //     tap((newData: IUserDetails) => {
    //       this.user$ = of(newData);
    //       this.showEditUserForm = false;
    //     })
    //   )
    //   .subscribe();
  }
}
