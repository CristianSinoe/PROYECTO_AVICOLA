import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CountryService } from '../service/country.service';
import { NodeService } from '../service/node.service';
import { TreeNode } from 'primeng/api';
import { Country } from '../service/customer.service';

@Component({
    selector: 'app-input-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule
    ],
    template: ` <p-fluid class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">ENTRADA DE TEXTO</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <input pInputText type="text" placeholder="POR DEFECTO" />
                        <input pInputText type="text" placeholder="DESHABILITADO" [disabled]="true" />
                        <input pInputText type="text" placeholder="NO VALIDO" class="ng-dirty ng-invalid" />
                    </div>

                    <div class="font-semibold text-xl">ICONOS</div>
                    <p-iconfield>
                        <p-inputicon class="pi pi-user" />
                        <input pInputText type="text" placeholder="NOMBRE DEL USUARIO" />
                    </p-iconfield>
                    <p-iconfield iconPosition="left">
                        <input pInputText type="text" placeholder="BUSCAR..." />
                        <p-inputicon class="pi pi-search" />
                    </p-iconfield>

                    <div class="font-semibold text-xl">ETIQUETA FLOTANTE</div>
                    <p-floatlabel>
                        <input pInputText id="username" type="text" [(ngModel)]="floatValue" />
                        <label for="username">NOMBRE DEL USUARIO</label>
                    </p-floatlabel>

                    <div class="font-semibold text-xl">DESCRIPCION</div>
                    <textarea pTextarea placeholder="ESCRIBE AQUI LA DESCRIPCION DE..." [autoResize]="true" rows="3" cols="30"></textarea>

                    <div class="font-semibold text-xl">AUTO COMPLETADO</div>
                    <p-autocomplete [(ngModel)]="selectedAutoValue" [suggestions]="autoFilteredValue" optionLabel="name" placeholder="Search" dropdown multiple display="chip" (completeMethod)="filterCountry($event)" />

                    <div class="font-semibold text-xl">FECHA DE REGISTRO</div>
                    <p-datepicker [showIcon]="true" [showButtonBar]="true" [(ngModel)]="calendarValue"></p-datepicker>

                    <div class="font-semibold text-xl">NUMERO DE AVES</div>
                    <p-inputnumber [(ngModel)]="inputNumberValue" showButtons mode="decimal"></p-inputnumber>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">PUNTUACIONES MOVILES/ELEGILES</div>
                    <input pInputText [(ngModel)]="sliderValue" type="number" />
                    <p-slider [(ngModel)]="sliderValue" />

                    <div class="flex flex-row mt-6">
                        <div class="flex flex-col gap-4 w-1/2">
                            <div class="font-semibold text-xl">CALIFICACION</div>
                            <p-rating [(ngModel)]="ratingValue" />
                        </div>
                        <div class="flex flex-col gap-4 w-1/2">
                            <div class="font-semibold text-xl">ELECCION DE COLOR</div>
                            <p-colorpicker [style]="{ width: '2rem' }" [(ngModel)]="colorValue" />
                        </div>
                    </div>

                    <div class="font-semibold text-xl">POR PORCENTAJE</div>
                    <p-knob [(ngModel)]="knobValue" [step]="10" [min]="-100" [max]="100" valueTemplate="{value}%" />
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">SELECCIONE UNA ZONA</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex items-center">
                            <p-radiobutton id="option1" name="option" value="Chicago" [(ngModel)]="radioValue" />
                            <label for="option1" class="leading-none ml-2">ZONA 1</label>
                        </div>
                        <div class="flex items-center">
                            <p-radiobutton id="option2" name="option" value="Los Angeles" [(ngModel)]="radioValue" />
                            <label for="option2" class="leading-none ml-2">ZONA 2</label>
                        </div>
                        <div class="flex items-center">
                            <p-radiobutton id="option3" name="option" value="New York" [(ngModel)]="radioValue" />
                            <label for="option3" class="leading-none ml-2">ZONA 3</label>
                        </div>
                        <div class="flex items-center">
                            <p-radiobutton id="option3" name="option" value="Rome" [(ngModel)]="radioValue" />
                            <label for="option3" class="leading-none ml-2">ZONA 4</label>
                        </div>
                        <div class="flex items-center">
                            <p-radiobutton id="option3" name="option" value="Paris" [(ngModel)]="radioValue" />
                            <label for="option3" class="leading-none ml-2">ZONA 5</label>
                        </div>
                    </div>

                    <div class="font-semibold text-xl">KAZETAS</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex items-center">
                            <p-checkbox id="checkOption1" name="option" value="Chicago" [(ngModel)]="checkboxValue" />
                            <label for="checkOption1" class="ml-2">KAZETA 1</label>
                        </div>
                        <div class="flex items-center">
                            <p-checkbox id="checkOption2" name="option" value="Los Angeles" [(ngModel)]="checkboxValue" />
                            <label for="checkOption2" class="ml-2">KAZETA 2</label>
                        </div>
                        <div class="flex items-center">
                            <p-checkbox id="checkOption3" name="option" value="New York" [(ngModel)]="checkboxValue" />
                            <label for="checkOption3" class="ml-2">KAZETA 3</label>
                        </div>
                        <div class="flex items-center">
                            <p-checkbox id="checkOption3" name="option" value="´Paris" [(ngModel)]="checkboxValue" />
                            <label for="checkOption3" class="ml-2">KAZETA 4</label>
                        </div>
                    </div>

                    <div class="font-semibold text-xl">MOSTRAR ESTADISTICAS</div>
                    <p-toggleswitch [(ngModel)]="switchValue" />
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">LISTA DE ZONAS</div>
                    <p-listbox [(ngModel)]="listboxValue" [options]="listboxValues" optionLabel="name" [filter]="true" />

                    <div class="font-semibold text-xl">SELECCIONE LA ZONA</div>
                    <p-select [(ngModel)]="dropdownValue" [options]="dropdownValues" optionLabel="name" placeholder="SELECCIONE UNA ZONA" />

                    <!--<div class="font-semibold text-xl">MultiSelect</div>
                    <p-multiselect [options]="multiselectCountries" [(ngModel)]="multiselectSelectedCountries" placeholder="Select Countries" optionLabel="name" display="chip" [filter]="true">
                        <ng-template #selecteditems let-countries>
                            @for (country of countries; track country.code) {
                                <div class="inline-flex items-center py-1 px-2 bg-primary text-primary-contrast rounded-border mr-2">
                                    <span [class]="'mr-2 flag flag-' + country.code.toLowerCase()" style="width: 18px; height: 12px"></span>
                                    <div>{{ country.name }}</div>
                                </div>
                            }
                        </ng-template>
                        <ng-template #item let-country>
                            <div class="flex items-center">
                                <span [class]="'mr-2 flag flag-' + country.code.toLowerCase()" style="width: 18px; height: 12px"></span>
                                <div>{{ country.name }}</div>
                            </div>
                        </ng-template>
                    </p-multiselect> -->

                    <div class="font-semibold text-xl">SELECCION DE ELEMENTOS</div>
                    <p-treeselect [(ngModel)]="selectedNode" [options]="treeSelectNodes" placeholder="SELECCIONA UN ELEMENTO"></p-treeselect>
                </div>

                <div class="card flex flex-col gap-4">
                    <!--<div class="font-semibold text-xl">ToggleButton</div>
                    <p-togglebutton [(ngModel)]="toggleValue" onLabel="Yes" offLabel="No" [style]="{ width: '10em' }" /> -->

                    <div class="font-semibold text-xl">SelectButton</div>
                    <p-selectbutton [(ngModel)]="selectButtonValue" [options]="selectButtonValues" optionLabel="name" />
                </div>
           </div>
        </p-fluid>

        <p-fluid class="flex mt-8">
            <div class="card flex flex-col gap-6 w-full">
                <div class="font-semibold text-xl">InputGroup</div>
                <div class="flex flex-col md:flex-row gap-6">
                    <p-inputgroup>
                        <p-inputgroup-addon>
                            <i class="pi pi-user"></i>
                        </p-inputgroup-addon>
                        <input pInputText placeholder="Username" />
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-inputgroup-addon>
                            <i class="pi pi-clock"></i>
                        </p-inputgroup-addon>
                        <p-inputgroup-addon>
                            <i class="pi pi-star-fill"></i>
                        </p-inputgroup-addon>
                        <p-inputnumber placeholder="Price" />
                        <p-inputgroup-addon>$</p-inputgroup-addon>
                        <p-inputgroup-addon>.00</p-inputgroup-addon>
                    </p-inputgroup>
                </div>
                <div class="flex flex-col md:flex-row gap-6">
                    <p-inputgroup>
                        <p-button label="Search" />
                        <input pInputText placeholder="Keyword" />
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-inputgroup-addon>
                            <p-checkbox [(ngModel)]="inputGroupValue" [binary]="true" />
                        </p-inputgroup-addon>
                        <input pInputText placeholder="Confirm" />
                    </p-inputgroup>
                </div>
            </div>
        </p-fluid>`,
    providers: [CountryService, NodeService]
})
export class InputDemo implements OnInit {
    floatValue: any = null;

    autoValue: any[] | undefined;

    autoFilteredValue: any[] = [];

    selectedAutoValue: any = null;

    calendarValue: any = null;

    inputNumberValue: any = null;

    sliderValue: number = 50;

    ratingValue: any = null;

    colorValue: string = '#1976D2';

    radioValue: any = null;

    checkboxValue: any[] = [];

    switchValue: boolean = false;

    listboxValues: any[] = [
        { name: 'ZONA 1', code: 'NY' },
        { name: 'ZONA 2', code: 'RM' },
        { name: 'ZONA 3', code: 'LDN' },
        { name: 'ZONA 4', code: 'IST' },
        { name: 'ZONA 5', code: 'PRS' }
    ];

    listboxValue: any = null;

    dropdownValues = [
        { name: 'ZONA 1', code: 'NY' },
        { name: 'ZONA 2', code: 'RM' },
        { name: 'ZONA 3', code: 'LDN' },
        { name: 'ZONA 4', code: 'IST' },
        { name: 'ZONA 5', code: 'PRS' }
    ];

    dropdownValue: any = null;

    multiselectCountries: Country[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    multiselectSelectedCountries!: Country[];

    toggleValue: boolean = false;

    selectButtonValue: any = null;

    selectButtonValues: any = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }];

    knobValue: number = 50;

    inputGroupValue: boolean = false;

    treeSelectNodes!: TreeNode[];

    selectedNode: any = null;

    countryService = inject(CountryService);

    nodeService = inject(NodeService);

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.autoValue = countries;
        });

        this.nodeService.getFiles().then((data) => (this.treeSelectNodes = data));
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        const filtered: any[] = [];
        const query = event.query;

        for (let i = 0; i < (this.autoValue as any[]).length; i++) {
            const country = (this.autoValue as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.autoFilteredValue = filtered;
    }
}
