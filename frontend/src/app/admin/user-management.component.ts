import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { User, UserRole } from '../core/models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  showForm = false;
  editingUser: User | null = null;
  apiDelay = 1000;
  roles: UserRole[] = ['General User', 'Admin'];
  columns = ['name', 'userId', 'email', 'department', 'role', 'status', 'actions'];

  form = this.fb.group({
    userId: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    role: ['General User' as UserRole, Validators.required],
    password: ['']
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAll(this.apiDelay).subscribe({
      next: users => { this.users = users; this.loading = false; },
      error: () => (this.loading = false)
    });
  }

  openCreate(): void {
    this.editingUser = null;
    this.form.reset({ role: 'General User' });
    this.form.get('password')?.setValidators(Validators.required);
    this.form.get('userId')?.enable();
    this.showForm = true;
  }

  openEdit(user: User): void {
    this.editingUser = user;
    this.form.patchValue(user);
    this.form.get('password')?.clearValidators();
    this.form.get('userId')?.disable();
    this.showForm = true;
  }

  save(): void {
    if (this.form.invalid) return;
    const val = this.form.getRawValue();
    const obs = this.editingUser
      ? this.userService.update(this.editingUser.userId, val as Partial<User>)
      : this.userService.create(val as any);

    obs.subscribe({ next: () => { this.showForm = false; this.loadUsers(); } });
  }

  delete(userId: string): void {
    if (!confirm('Delete this user?')) return;
    this.userService.remove(userId).subscribe(() => this.loadUsers());
  }

  onDelayChange(val: number): void {
    this.apiDelay = val;
    this.loadUsers();
  }
}
