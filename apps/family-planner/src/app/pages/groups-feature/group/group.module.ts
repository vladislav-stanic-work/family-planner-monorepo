import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UiModule } from '@family-planner/ui';

import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';

@NgModule({
  imports: [CommonModule, GroupRoutingModule, UiModule, MatButtonModule],
  declarations: [GroupComponent],
})
export class GroupModule {}
