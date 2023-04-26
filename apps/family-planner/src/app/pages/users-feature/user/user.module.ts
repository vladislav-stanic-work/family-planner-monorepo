import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@family-planner/ui';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, UiModule],
  declarations: [UserComponent],
})
export class UserModule {}
