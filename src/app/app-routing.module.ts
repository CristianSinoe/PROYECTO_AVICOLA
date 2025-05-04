import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KazetaDetailComponent } from './pages/kazeta-detail/kazeta-detail.component';

const routes: Routes = [
  { path: 'kazeta/:zona/:kazetaIndex', component: KazetaDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
