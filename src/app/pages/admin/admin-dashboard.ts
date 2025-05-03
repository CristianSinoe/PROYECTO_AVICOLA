import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget } from '../dashboard/components/statswidget';
import { RevenueStreamWidget } from '../dashboard/components/revenuestreamwidget';
import { NotificationsWidget } from '../dashboard/components/notificationswidget';
import { RouterModule } from '@angular/router';
import { AppTopbar } from '../../layout/component/app.topbar';
import { AppSidebar } from '../../layout/component/app.sidebar';
import { AppFooter } from '../../layout/component/app.footer';
import { AppMenu } from '../../layout/component/app.menu';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    StatsWidget,
    RevenueStreamWidget,
    NotificationsWidget
  ],
  template: `
    <h1 class="text-3xl font-bold mb-4">PANEL DE ADMINISTRADOR</h1>
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 xl:col-span-12">
        <app-stats-widget />
      </div>
      <div class="col-span-12 xl:col-span-12">
        <app-revenue-stream-widget />
        <app-notifications-widget />
      </div>
    </div>
  `
})
export class AdminDashboard {}
