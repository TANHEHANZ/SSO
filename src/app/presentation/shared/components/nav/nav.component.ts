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

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    RouterLink,
    LucideAngularModule,
    SidebarMenuComponent,
  ],
  template: `
    <nav class="bg-white dark:bg-dark flex h-full">
      <div>
        <navigation-component
          label="Graficas"
          [icon]="Chart"
          [active]="activeSidebar === 'reports'"
          color="#482778"
          (onClick)="toggleSidebar('reports')"
        />
        <navigation-component
          label="usuarios"
          [icon]="User"
          [active]="activeSidebar === 'users'"
          color="#F9B100"
          (onClick)="toggleSidebar('users')"
        />
        <navigation-component
          label="configuracion"
          [icon]="Settings"
          [active]="activeSidebar === 'settings'"
          color="#EA547C"
          (onClick)="toggleSidebar('settings')"
        />
      </div>

      <div
        class="transition-all duration-300 overflow-hidden dark:bg-dark border-l border-gray-100 dark:border-gray-700"
        [class.w-0]="!activeSidebar"
        [class.w-64]="activeSidebar"
      >
        @if (activeSidebar === 'reports') {
        <app-sidebar-menu
          [items]="navItemsReportes[0].children"
          color="#482778"
        />
        } @if (activeSidebar === 'users') {
        <app-sidebar-menu [items]="navItemsGestion" color="#F9B100" />
        } @if (activeSidebar === 'settings') {
        <app-sidebar-menu
          [items]="navItemsConfiguraciones[0].children"
          color="#EA547C"
        />
        }
      </div>
    </nav>
  `,
})
export class NavComponent implements OnInit {
  collapsed = false;
  private navState = inject(NavStateService);
  readonly Settings = Settings;
  readonly Chart = ChartColumnDecreasing;
  readonly User = UserRound;
  activeSidebar: 'reports' | 'users' | 'settings' | null = null;

  toggleSidebar(type: 'reports' | 'users' | 'settings') {
    this.activeSidebar = this.activeSidebar === type ? null : type;
  }

  ngOnInit() {
    this.navState.isExpanded$.subscribe(
      (isExpanded) => (this.collapsed = !isExpanded)
    );
  }
  handleClick() {
    console.log('se pulso aca ');
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
          label: 'Configuraciones generales',
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
