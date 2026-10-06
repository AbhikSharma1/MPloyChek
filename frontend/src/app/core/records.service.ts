import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmploymentRecord } from './models';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private base = `${environment.apiUrl}/records`;

  constructor(private http: HttpClient) {}

  getRecords(delay = environment.apiDelay): Observable<EmploymentRecord[]> {
    return this.http.get<EmploymentRecord[]>(`${this.base}?delay=${delay}`);
  }
}
