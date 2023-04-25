import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@family-planner/ui';

import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [CommonModule, GroupsRoutingModule, UiModule],
  declarations: [GroupsComponent],
})
export class GroupsModule {}
