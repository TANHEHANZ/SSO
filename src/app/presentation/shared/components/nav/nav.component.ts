import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation';
import {
  ChartColumnDecreasing,
  ChartPie,
  FileText,
  Monitor,
  ScanEye,
  Settings,
  TriangleAlert,
  UserRound,
  UserRoundCog,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  template: `
    <nav
      class="bg-white dark:bg-gray-800 shadow h-full  border-r dark:border-r-gray-500"
    >
      <h1 class="p-4 text-2xl min-h-[120px] w-full">
        <img
          src="./assets/images/logo cochabamba.png"
          alt="Logo"
          class="h-[80px] object-cover"
        />
      </h1>
      <navigation-component [items]="navItemsReportes" title="Graficas" />
      <navigation-component [items]="navItemsGestion" title="Entidades" />
      <navigation-component
        [items]="navItemsConfiguraciones"
        title="Configuraciones"
      />
    </nav>
  `,
})
export class NavComponent {
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
