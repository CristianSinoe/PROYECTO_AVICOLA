// src/app/pages/service/administrator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEmployeeService } from './base-employee.service';

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
export class AdministratorService extends BaseEmployeeService<AdministratorRequest> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/administrators');
  }
}