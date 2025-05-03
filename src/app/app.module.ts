import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'primeng/chart';
import { KazetaDetailComponent } from './pages/kazeta-detail/kazeta-detail.component';

@NgModule({
  declarations: [
    KazetaDetailComponent  // Solo declaramos KazetaDetailComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  bootstrap: []  // No es necesario poner AppComponent aquí
})
export class AppModule { }
