import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'primeng/chart';
import { PanelMenuModule } from 'primeng/panelmenu'; // 👈 IMPORTANTE
import { KazetaDetailComponent } from './pages/kazeta-detail/kazeta-detail.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { HttpClientModule } from '@angular/common/http'; 
import { GranjeroLayoutComponent } from './pages/granjero/layout/component/granjero.layout.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    PanelMenuModule,
    KazetaDetailComponent,
    RedirectComponent,
    GranjeroLayoutComponent,
    HttpClientModule
  ],
  bootstrap: []
})
export class AppModule {}
