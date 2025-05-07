import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KazetaDetailComponent } from './pages/kazeta-detail/kazeta-detail.component';
import { ZonaDashboardComponent } from './pages/zonas/zona-dashboard.component'; // asegúrate de importar correctamente

const routes: Routes = [
  { path: 'kazeta/:zona/:kazetaIndex', component: KazetaDetailComponent },
  { path: 'zona/:zona', component: ZonaDashboardComponent }  // ← ESTA ES LA QUE FALTA
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
