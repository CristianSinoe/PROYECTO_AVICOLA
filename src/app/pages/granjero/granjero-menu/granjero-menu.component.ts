import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '../../../layout/component/app.menuitem';
import { DataService } from '../../../services/data.service'; // asegúrate de tener este servicio

@Component({
  selector: 'app-granjero-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  templateUrl: './granjero-menu.component.html',
  styleUrls: ['./granjero-menu.component.scss']
})
export class GranjeroMenuComponent {
  model: MenuItem[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const usuario = data.usuarios.find((u: any) => u.email === user.email);
      const kazetasAsignadas = data.kazetas.filter((k: any) => usuario.kazetasAsignadas.includes(k.id));

      this.model = [
        {
          label: 'KAZETAS',
          icon: 'pi pi-home',
          items: kazetasAsignadas.map((k: any) => ({
            label: `${k.nombre} (${k.zona})`,
            icon: 'pi pi-map-marker',
            command: () => this.router.navigate([`/granjero/kazeta/${k.id}`])
          }))
        }
      ];
    });
  }
}
