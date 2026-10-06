import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { RecordsService } from '../core/records.service';
import { User, EmploymentRecord } from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  records: EmploymentRecord[] = [];
  loading = true;
  recordColumns = ['type', 'description', 'date', 'status'];

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private recordsService: RecordsService
  ) {}

  ngOnInit(): void {
    // Demonstrate async parallel loading with delay
    forkJoin({
      profile: this.userService.getMe(),
      records: this.recordsService.getRecords()
    })
    .pipe(finalize(() => (this.loading = false)))
    .subscribe({
      next: ({ profile, records }) => {
        this.user = profile;
        this.records = records;
      }
    });
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      Approved: 'primary', Generated: 'accent', Completed: 'primary',
      Pending: 'warn', Inactive: 'warn'
    };
    return map[status] || 'default';
  }
}
