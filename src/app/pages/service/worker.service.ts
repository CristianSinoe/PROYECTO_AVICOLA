import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { FlockkeeperService } from './flockkeeper.service';
import { ManagerService } from './manager.service';
import { AdministratorService } from './administrator.service';

export interface Worker {
  id?: number;
  name?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  email?: string;
  username?: string;
  urlPhotoId?: string;
  rfcEmployee?: string;
  category?: 'GRANJERO' | 'ENCARGADO' | 'ADMINISTRADOR';
  status?: string;
  code?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(
    private flockkeeper: FlockkeeperService,
    private manager: ManagerService,
    private admin: AdministratorService
  ) {}

  async getWorkers(): Promise<Worker[]> {
    const granjeros = await lastValueFrom(this.flockkeeper.getAll());
    const encargados = await lastValueFrom(this.manager.getAll());
    const admins = await lastValueFrom(this.admin.getAll());

    const addCategory = (list: any[], category: Worker['category']) =>
      list.map((w) => ({
        ...w,
        id: w.idEmployee,
        name: w.nameEmployee,
        category
      }));

    return [
      ...addCategory(granjeros, 'GRANJERO'),
      ...addCategory(encargados, 'ENCARGADO'),
      ...addCategory(admins, 'ADMINISTRADOR')
    ];
  }
}