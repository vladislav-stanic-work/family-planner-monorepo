import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreateComponent } from '@family-planner/ui';
import { EROUTES, IGroup } from '@family-planner/utils';
import { finalize, take, tap } from 'rxjs';

import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'fpl-groups-page',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  dataSource: IGroup[] = [];
  displayedColumns: string[] = ['num', 'name', 'members'];
  dataStatus = 'Data is loading...';
  thisId = '';

  EROUTES = EROUTES;
  // EROLES = EROLES;

  constructor(
    private readonly groupsService: GroupsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GroupCreateComponent, {
      data: { member: this.thisId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!Object.keys(result).length) {
        return;
      }

      this.groupsService
        .createGroup(result)
        .pipe(
          take(1),
          tap(() => this.getGroups())
        )
        .subscribe();
    });
  }

  private getGroups() {
    this.groupsService
      .getGroups()
      .pipe(
        // Add until
        take(1),
        tap((res: IGroup[]) => {
          this.dataSource = res;
          this.thisId = JSON.parse(localStorage.getItem('user') || '')?._id;
        }),
        finalize(() => {
          if (!this.dataSource.length) {
            this.dataStatus = 'There are no groups.';
          }
        })
      )
      .subscribe();
  }
}
