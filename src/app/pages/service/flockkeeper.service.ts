// src/app/services/flockkeeper.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class FlockkeeperService {
    private apiUrl = 'http://localhost:8080/api/flockkeepers'; // ajusta si es necesario

    constructor(private http: HttpClient) {}

    create(flockKeeper: FlockKeeperRequest): Observable<any> {
        return this.http.post(this.apiUrl, flockKeeper);
    }
}
