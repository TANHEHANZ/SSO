import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation';
import {
  FileText,
  LayoutDashboard,
  Monitor,
  Settings,
  Shield,
  ShieldEllipsis,
  ShieldX,
  UserRound,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  template: `
    <nav class="bg-white dark:bg-gray-800 shadow h-full border border-r">
      <h1 class="p-4 text-2xl min-h-[120px]">logo GAMC</h1>
      <navigation-component [items]="navItems" title="Menu" />
    </nav>
  `,
})
export class NavComponent {
  readonly navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: '/admin/users',
      label: 'Usuarios',
      icon: UserRound,
    },

    {
      path: '/admin/applications',
      label: 'Applications',
      icon: Monitor,
    },
    {
      path: '/admin/settings',
      label: 'Configuraciones',
      icon: Settings,
      children: [
        {
          path: '/admin/settings/roles',
          label: 'Roles y Permissions',
          icon: Shield,
        },
        {
          path: '/admin/settings/audit',
          label: 'Audit Logs',
          icon: FileText,
        },
        {
          path: '/admin/settings/ips',
          label: 'ip bloqueados',
          icon: ShieldX,
        },
      ],
    },
  ];
}
