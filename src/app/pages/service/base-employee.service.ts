// src/app/pages/service/base-employee.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseEmployeeService<TRequest> {
  protected constructor(
    protected http: HttpClient,
    protected apiUrl: string
  ) {}

  create(request: TRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  update(id: number, request: TRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
