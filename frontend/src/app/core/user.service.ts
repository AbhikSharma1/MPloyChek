import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.base}/me`);
  }

  getAll(delay = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}?delay=${delay}`);
  }

  create(user: Partial<User> & { password: string }): Observable<User> {
    return this.http.post<User>(this.base, user);
  }

  update(userId: string, changes: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${userId}`, changes);
  }

  remove(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${userId}`);
  }
}
