import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@family-planner/ui';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, UiModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
