import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  imports: [FontAwesomeModule, RouterModule],
  selector: 'menu-nav',
  template: `
    <div
      class="absolute right-0 top-[calc(100%+8px)] w-72 bg-white rounded-lg shadow-lg border p-2 z-[999]"
    >
      <!-- Profile Section -->
      <div
        class="bg-primary-theme_orage/10 flex justify-center items-center rounded-lg flex-col gap-2 min-h-40"
      >
        <p
          class="text-gray-400 text-xl border rounded-full w-16 h-16 flex justify-center items-center"
        >
          <fa-icon [icon]="getIcon('UserRoundCog')"></fa-icon>
        </p>
        <div class="flex flex-col items-center">
          <p class="text-sm font-medium">Nombre Usuario</p>
          <p class="text-xs text-gray-500">Espacio de trabajo</p>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-2">
        @for(item of itemsMenu; track item.id) { @if(item.id !== '8' && item.id
        !== '7') {
        <button
          class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 group flex items-center gap-2"
          [routerLink]="item.path"
        >
          <fa-icon
            [icon]="getIcon(item.icon)"
            class="text-gray-400 group-hover:text-primary-theme_purple"
          ></fa-icon>
          <span class="group-hover:text-primary-theme_purple">{{
            item.name
          }}</span>
        </button>
        } }
      </div>

      <!-- Logout Section -->
      <div class="py-1 grid grid-cols-2 gap-2">
        <button
          class="w-full px-4 py-2 text-left text-sm rounded-lg  hover:bg-gray-50 flex flex-col border items-center gap-2 "
          [routerLink]="itemsMenu[6].path"
        >
          <fa-icon [icon]="getIcon(itemsMenu[6].icon)"></fa-icon>
          <span>{{ itemsMenu[6].name }}</span>
        </button>
        <button
          class="w-full px-4 py-2 text-left text-sm rounded-lg  hover:bg-gray-50 flex flex-col border items-center gap-2 text-red-600"
          [routerLink]="itemsMenu[7].path"
        >
          <fa-icon
            [icon]="getIcon(itemsMenu[7].icon)"
            class="text-red-400"
          ></fa-icon>
          <span>{{ itemsMenu[7].name }}</span>
        </button>
      </div>
    </div>
  `,
})
export class MenuNavComponent {
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
  itemsMenu = [
    {
      id: '1',
      name: 'Configuración de cuenta',
      path: '/settings/account',
      icon: 'UserRound' as const,
    },
    {
      id: '2',
      name: 'Espacio de trabajo',
      path: '/settings/workspace',
      icon: 'Settings' as const,
    },
    {
      id: '3',
      name: 'Uso del proyecto',
      path: '/settings/usage',
      icon: 'ChartPie' as const,
    },
    {
      id: '4',
      name: 'Mis proyectos',
      path: '/projects',
      icon: 'FolderOpen' as const,
    },
    {
      id: '5',
      name: 'Documentación',
      path: '/docs',
      icon: 'FileText' as const,
    },
    {
      id: '6',
      name: 'Soporte',
      path: '/support',
      icon: 'Terminal' as const,
    },
    {
      id: '7',
      name: 'Tema oscuro',
      path: null,
      icon: 'Desktop' as const,
    },
    {
      id: '8',
      name: 'Cerrar sesión',
      path: '/logout',
      icon: 'SignOutAlt' as const,
      color: '#EF4444',
    },
  ] as const;
}
