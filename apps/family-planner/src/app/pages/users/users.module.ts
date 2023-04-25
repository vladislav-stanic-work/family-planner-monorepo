import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UiModule } from '@family-planner/ui';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, UiModule, MatTableModule],
  declarations: [UsersComponent],
})
export class UsersModule {}
