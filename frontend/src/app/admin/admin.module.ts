import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, AdminRoutingModule, SharedModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatChipsModule, MatProgressBarModule, MatTooltipModule, MatSliderModule
  ]
})
export class AdminModule {}
