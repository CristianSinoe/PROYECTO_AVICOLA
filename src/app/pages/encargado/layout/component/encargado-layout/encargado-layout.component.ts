import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EncargadoMenuComponent } from '../../../encargado-menu/encargado-menu.component';

@Component({
  selector: 'app-encargado-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EncargadoMenuComponent // Menú dinámico del encargado
  ],
  templateUrl: './encargado-layout.component.html',
  styleUrls: ['./encargado-layout.component.scss']
})
export class EncargadoLayoutComponent {}
