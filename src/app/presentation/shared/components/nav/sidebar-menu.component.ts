import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface MenuItem {
  path: string;
  label: string;
  icon: any;
  color?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="p-4">
      @for (item of items; track $index) {
      <a
        [routerLink]="item.path"
        routerLinkActive="active"
        [style.color]="color"
        [style.--menu-color]="color"
        class="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-opacity-10"
        [ngStyle]="{
          'background-color': 'transparent',
          '&.active': {
            'background-color': color + '1a',
            color: color
          },
          '&:hover': {
            'background-color': color + '1a'
          }
        }"
      >
        <i-lucide [img]="item.icon" [size]="18" />
        <span>{{ item.label }}</span>
      </a>
      }
    </div>
  `,
  styles: [
    `
      a.active {
        background-color: var(--menu-color) + '1a' !important;
        color: var(--menu-color) !important;
      }
      a:hover {
        background-color: var(--menu-color) + '1a';
      }
    `,
  ],
})
export class SidebarMenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() color: string = '#482778';
}
