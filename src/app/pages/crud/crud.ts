import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Worker, WorkerService } from '../service/worker.service';
import { FlockkeeperService } from '../service/flockkeeper.service';
import { ManagerService } from '../service/manager.service';
import { PoultryHouseService } from '../service/poultryhouse.service';
import { AdministratorService } from '../service/administrator.service';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        SelectModule,
        RadioButtonModule,
        DialogModule,
        ConfirmDialogModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="NUEVO" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="ELIMINAR" icon="pi pi-trash" outlined (onClick)="deleteSelectedWorkers()" [disabled]="!selectedWorkers || !selectedWorkers.length" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="workers()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [(selection)]="selectedWorkers"
            [rowHover]="true"
            dataKey="id"
            [tableStyle]="{ width: '100%' }"
        >
            <ng-template #header>
                <tr>
                    <th style="width: 2rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th style="min-width: 16rem">CODIGO</th>
                    <th pSortableColumn="name" style="min-width:16rem">NOMBRE<p-sortIcon field="name" /></th>
                    <th pSortableColumn="category" style="min-width:10rem">PUESTO<p-sortIcon field="category" /></th>
                    <th> </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-worker>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="worker" />
                    </td>
                    <td style="min-width: 12rem">{{ worker.id }}</td>
                    <td style="min-width: 16rem">{{ worker.name }}</td>
                    <td>{{ worker.category }}</td>
                    <td>{{ worker.status }}</td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editWorker(worker)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteWorker(worker)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="workerDialog" [style]="{ width: '450px' }" header="AÑADIR UN TRABAJADOR" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="name" class="block font-bold mb-3">NOMBRE</label>
                        <input type="text" pInputText id="name" [(ngModel)]="worker.name" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !worker.name">EL NOMBRE ES OBLIGATORIO.</small>
                    </div>

                    <div>
                        <label for="status" class="block font-bold mb-3">ESTATUS</label>
                        <p-select [(ngModel)]="worker.status" inputId="status" [options]="statuses" optionLabel="label" optionValue="value" placeholder="SELECCIONE EL ESTATUS" fluid />
                    </div>

                    <div>
                        <span class="block font-bold mb-4">PUESTO</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-4">
                                <p-radiobutton id="category1" name="category" value="ADMINISTRADOR" [(ngModel)]="worker.category" />
                                <label for="category1">ADMINISTRADOR</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-4">
                                <p-radiobutton id="category2" name="category" value="GRANJERO" [(ngModel)]="worker.category" />
                                <label for="category2">GRANJERO</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-4">
                                <p-radiobutton id="category3" name="category" value="ENCARGADO" [(ngModel)]="worker.category" />
                                <label for="category3">ENCARGADO</label>
                            </div>
                        </div>
                    </div>
                </div> 
            </ng-template>

            <ng-template #footer>
                <p-button label="CANCELAR" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="GUARDAR" icon="pi pi-check" (click)="saveWorker()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, WorkerService, ConfirmationService, FlockkeeperService, ManagerService, PoultryHouseService]
})
export class Crud implements OnInit {
    workerDialog: boolean = false;

    workers = signal<Worker[]>([]);

    worker!: Worker;

    selectedWorkers!: Worker[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    cols!: Column[];

    constructor(
        private flockKeeperService: FlockkeeperService,
        private managerService: ManagerService,
        private poultryHouseService: PoultryHouseService,
        private workerService: WorkerService,
        private messageService: MessageService,
        private administratorService: AdministratorService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadWorkers();
        this.statuses = [
            { label: 'ACTIVO', value: 'ACTIVO' },
            { label: 'RENUNCIA', value: 'RENUNCIA' },
            { label: 'BAJA', value: 'BAJA' }
        ];
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'name', header: 'Nombre' },
            { field: 'category', header: 'Puesto' },
            { field: 'status', header: 'Estatus' }
        ];
    }

    loadWorkers() {
        this.workerService.getWorkers().then((data) => {
            this.workers.set(data);
        });
    }

    openNew() {
        this.worker = {};
        this.submitted = false;
        this.workerDialog = true;
    }

    editWorker(worker: Worker) {
        this.worker = { ...worker };
        this.workerDialog = true;
    }

    deleteSelectedWorkers() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que deseas eliminar los trabajadores seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.workers.set(this.workers().filter((val) => !this.selectedWorkers?.includes(val)));
                this.selectedWorkers = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Trabajadores eliminados',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.workerDialog = false;
        this.submitted = false;
    }

    deleteWorker(worker: Worker) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que deseas eliminar ' + worker.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.workers.set(this.workers().filter((val) => val.id !== worker.id));
                this.worker = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Trabajador eliminado',
                    life: 3000
                });
            }
        });
    }

    saveWorker() {
        this.submitted = true;

        // Validación de campos obligatorios
        if (!this.worker.name?.trim() || !this.worker.category?.trim() || !this.worker.status?.trim()) {
            this.messageService.add({
                severity: 'error',
                summary: 'CAMPOS INVÁLIDOS',
                detail: 'Debes completar el nombre, seleccionar un puesto y un estatus.'
            });
            return;
        }

        const baseName = this.worker.name.toLowerCase().replace(/\s/g, '');
        const suffix = Math.floor(Math.random() * 1000);
        const username = baseName + suffix;
        const email = `${username}@gmail.com`;
        const rfcEmployee = this.generateRFC();

        const workerPayload = {
            username: username,
            email: email,
            password: 'SecurePass123',
            nameEmployee: this.worker.name,
            lastName: 'Apellido', // Placeholder, puede ser modificado
            middleName: 'Segundo', // Placeholder, puede ser modificado
            birthDate: '1990-01-01', // Placeholder, puede ser modificado
            urlPhotoId: 'https://via.placeholder.com/150', // Placeholder, puede ser modificado
            rfcEmployee: rfcEmployee,
            category: this.worker.category,
            status: this.worker.status
        };

        let serviceToUse;
        switch (this.worker.category) {
            case 'GRANJERO':
                serviceToUse = this.flockKeeperService;
                break;
            case 'ADMINISTRADOR':
                serviceToUse = this.administratorService;
                break;
            case 'ENCARGADO':
                serviceToUse = this.managerService;
                break;
            default:
                this.messageService.add({
                    severity: 'error',
                    summary: 'Categoría no válida',
                    detail: 'Por favor selecciona una categoría válida.'
                });
                return;
        }

        serviceToUse.create(workerPayload).subscribe({
            next: (res) => {
                this.workers.set([...this.workers(), { ...workerPayload, id: res.id }]);
                this.messageService.add({
                    severity: 'success',
                    summary: '¡Trabajador creado!',
                    detail: `ID generado: ${res.id}`,
                    life: 3000
                });
                this.workerDialog = false;
                this.worker = {};
            },
            error: (err) => {
                console.error('Error al crear trabajador:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo crear el trabajador.',
                    life: 3000
                });
            }
        });
    }

    generateRFC(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let rfc = '';
        for (let i = 0; i < 13; i++) {
            rfc += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return rfc;
    }
}
