// src/app/pages/service/administrator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdministratorRequest {
  username: string;
  email: string;
  password: string;
  nameEmployee: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  urlPhotoId: string;
  rfcEmployee: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private apiUrl = 'http://localhost:8080/api/administrators';

  constructor(private http: HttpClient) {}

  create(request: AdministratorRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}
