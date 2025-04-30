import { Component, inject, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation';
import {
  ChartColumnDecreasing,
  ChartPie,
  FileText,
  LucideAngularModule,
  Monitor,
  ScanEye,
  Settings,
  TriangleAlert,
  UserRound,
  UserRoundCog,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { NavStateService } from '@app/infraestructure/global/nav.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { ColorService } from '../../../../infraestructure/global/colors.service';
import { colors } from '../../../../infraestructure/config/constants';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    LucideAngularModule,
    SidebarMenuComponent,
  ],
  template: `
    <nav class="flex h-full">
      <div
        class="w-[100px] bg-white dark:bg-dark-background border-r  border-gray-100 dark:border-gray-900"
      >
        <navigation-component
          label="Graficas"
          [icon]="Chart"
          [active]="activeSidebar === 'reports'"
          [color]="colors[0]"
          (onClick)="toggleSidebar('reports', colors[0])"
        />
        <navigation-component
          label="usuarios"
          [icon]="User"
          [active]="activeSidebar === 'users'"
          [color]="colors[1]"
          (onClick)="toggleSidebar('users', colors[1])"
        />
        <navigation-component
          label="config..."
          [icon]="Settings"
          [active]="activeSidebar === 'settings'"
          [color]="colors[2]"
          (onClick)="toggleSidebar('settings', colors[2])"
        />
      </div>

      <div
        class="transition-all duration-300 overflow-hidden dark:bg-dark"
        [class.w-0]="!activeSidebar"
        [class.w-64]="activeSidebar"
      >
        <app-sidebar-menu
          *ngIf="activeSidebar === 'reports'"
          [items]="navItemsReportes[0].children"
          [color]="currentColorClass"
        ></app-sidebar-menu>
        <app-sidebar-menu
          *ngIf="activeSidebar === 'users'"
          [items]="navItemsGestion"
          [color]="currentColorClass"
        ></app-sidebar-menu>
        <app-sidebar-menu
          *ngIf="activeSidebar === 'settings'"
          [items]="navItemsConfiguraciones[0].children"
          [color]="currentColorClass"
        ></app-sidebar-menu>
      </div>
    </nav>
  `,
})
export class NavComponent {
  readonly Chart = ChartColumnDecreasing;
  readonly User = UserRound;
  readonly Settings = Settings;
  readonly colors = colors;
  activeSidebar: 'reports' | 'users' | 'settings' | null = null;
  currentColorClass: string = '';

  toggleSidebar(type: 'reports' | 'users' | 'settings', colorClass: string) {
    this.activeSidebar = this.activeSidebar === type ? null : type;
    this.currentColorClass = colorClass;
  }
  readonly navItemsReportes = [
    {
      path: '/admin/reportes',
      label: 'Reportes',
      icon: ChartColumnDecreasing,
      children: [
        {
          path: '/admin/dashboard/reports',
          label: 'Gráficas',
          icon: ChartPie,
        },
        {
          path: '/admin/dashboard/exports',
          label: 'Exportaciones',
          icon: FileText,
        },
        {
          path: '/admin/dashboard/alert',
          label: 'Alertas',
          icon: TriangleAlert,
        },
      ],
    },
  ];

  readonly navItemsGestion = [
    {
      path: '/admin/usuarios',
      label: 'Usuarios',
      icon: UserRound,
    },
    {
      path: '/admin/clientes',
      label: 'Clientes',
      icon: Monitor,
    },
  ];

  readonly navItemsConfiguraciones = [
    {
      path: '/admin/configuraciones',
      label: 'Configuraciones',
      icon: Settings,
      children: [
        {
          path: '/admin/configuraciones/parametros',
          label: 'generales',
          icon: Settings,
        },
        {
          path: '/admin/configuraciones/roles',
          label: 'Roles',
          icon: UserRoundCog,
        },
        {
          path: '/admin/configuraciones/permisos',
          label: 'Permisos',
          icon: UserRoundCog,
        },
        {
          path: '/admin/configuraciones/auditoria',
          label: 'Auditoría',
          icon: ScanEye,
        },
      ],
    },
  ];
}
