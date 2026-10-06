import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, DashboardRoutingModule, SharedModule,
    MatCardModule, MatTableModule, MatProgressBarModule,
    MatChipsModule, MatIconModule, MatButtonModule,
    MatDividerModule, MatBadgeModule, MatTooltipModule
  ]
})
export class DashboardModule {}
