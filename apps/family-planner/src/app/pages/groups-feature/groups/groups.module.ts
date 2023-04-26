import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { UiModule } from '@family-planner/ui';

import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule,
    UiModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [GroupsComponent],
})
export class GroupsModule {}
