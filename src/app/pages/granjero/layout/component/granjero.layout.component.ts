import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GranjeroMenuComponent } from '../../granjero-menu/granjero-menu.component';

@Component({
  selector: 'app-granjero-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GranjeroMenuComponent // ✅ Este contiene todo el menú
  ],
  templateUrl: './granjero.layout.component.html',
  styleUrls: ['./granjero.layout.component.scss']
})
export class GranjeroLayoutComponent {}
