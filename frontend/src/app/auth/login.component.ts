import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserRole } from '../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
    role: ['General User' as UserRole, Validators.required]
  });

  roles: UserRole[] = ['General User', 'Admin'];
  loading = false;
  error = '';
  hidePassword = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
