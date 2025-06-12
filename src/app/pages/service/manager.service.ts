import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdministratorRequest } from './administrator.service';
import { BaseEmployeeService } from './base-employee.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends BaseEmployeeService<AdministratorRequest> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/managers');
  }
}