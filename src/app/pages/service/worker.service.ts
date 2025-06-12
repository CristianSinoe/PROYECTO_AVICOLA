import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

export interface Worker {
  id?: number;
  name?: string;
  category?: 'GRANJERO' | 'ENCARGADO' | 'ADMINISTRADOR';
  status?: string;
  code?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = 'http://localhost:8080/api/workers'; // 🔄 Cambia si tu backend usa otra ruta

  constructor(private http: HttpClient) {}

  getWorkers(): Promise<Worker[]> {
    return lastValueFrom(this.http.get<Worker[]>(this.apiUrl));
  }

  getById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
