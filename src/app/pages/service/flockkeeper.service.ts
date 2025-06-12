// src/app/services/flockkeeper.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEmployeeService } from './base-employee.service';
import { AdministratorRequest } from './administrator.service';

export interface FlockKeeperRequest {
    username: string;
    email: string;
    password: string;
    nameEmployee: string;
    lastName: string;
    middleName: string;
    birthDate: string; // formato: "YYYY-MM-DD"
    urlPhotoId: string;
    rfcEmployee: string;
}

@Injectable({
    providedIn: 'root'
})
export class FlockkeeperService extends BaseEmployeeService<AdministratorRequest> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/flockkeepers');
  }
}
