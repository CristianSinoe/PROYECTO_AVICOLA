import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-formlayout-demo',
    standalone: true,
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule],
    template: `<p-fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">VERTICAL</div>
                    <div class="flex flex-col gap-2">
                        <label for="name1">NOMBRE</label>
                        <input pInputText id="name1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email1">CORREO ELECTRONICO</label>
                        <input pInputText id="email1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="age1">EDAD</label>
                        <input pInputText id="age1" type="text" />
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">REJILLA VERTICAL</div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2"> <br>NOMBRE</label>
                            <input pInputText id="name2" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="email2">CORREO ELECTRONICO</label>
                            <input pInputText id="email2" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <!--
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">HORIZONTAL</div>
                    <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">NOMBRE</label>
                        <div class="col-span-12 md:col-span-10">
                            <input pInputText id="name3" type="text" />
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                        <label for="email3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">CORREO ELECTRONICO</label>
                        <div class="col-span-12 md:col-span-10">
                            <input pInputText id="email3" type="text" />
                        </div>
                    </div>
                </div>
-->
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">EN LINEA</div>
                    <div class="flex flex-wrap items-start gap-6">
                        <div class="field">
                            <label for="firstname1" class="sr-only">NOMBRE</label>
                            <input pInputText id="firstname1" type="text" placeholder="NOMBRE" />
                        </div>
                        <div class="field">
                            <label for="lastname1" class="sr-only">APELLIDO</label>
                            <input pInputText id="lastname1" type="text" placeholder="APELLIDO" />
                        </div>
                        <p-button label="ENTREGRAR" [fluid]="false"></p-button>
                    </div>
                </div>
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">RECUPERAR CONTRASEÑA</div>
                    <div class="flex flex-wrap gap-2">
                        <label for="username">NOMBRE DEL USUARIO</label>
                        <input pInputText id="username" type="text" />
                        <small>INTRODUZCA SU NOMBRE PARA RESTABLECER SU CONTRASEÑA</small>
                    </div>
                </div>
            </div>
      <!--  </div> -->
        <div class="flex mt-8">
            <div class="card flex flex-col gap-6 w-full">
                <div class="font-semibold text-xl">AVANZADO</div>
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">NOMBRE/S</label>
                        <input pInputText id="firstname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">APELLLIDOS</label>
                        <input pInputText id="lastname2" type="text" />
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <label for="address">DIRECCION</label>
                    <textarea pTextarea id="address" rows="4"></textarea>
                </div>

                <div class="flex flex-col md:flex-row gap-6">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">ESTADO</label>
                        <p-select id="state" [(ngModel)]="dropdownItem" [options]="dropdownItems" optionLabel="name" placeholder="SELECCIONA UNO" class="w-full"></p-select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="zip">ZIP</label>
                        <input pInputText id="zip" type="text" />
                    </div>
                </div>
            </div>
        </div>
    </p-fluid>`
})
export class FormLayoutDemo {
    dropdownItems = [
        { name: 'OPCION 1', code: 'Option 1' },
        { name: 'OPCION 2', code: 'Option 2' },
        { name: 'OPCION 3', code: 'Option 3' }
    ];

    dropdownItem = null;
}
