import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@family-planner/ui';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, UiModule],
  declarations: [UsersComponent],
})
export class UsersModule {}
