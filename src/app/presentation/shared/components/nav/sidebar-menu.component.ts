import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
    <div
      class="p-4 h-full flex flex-col gap-4 bg-white shadow-sm dark:bg-dark-background/60  border-r  border-gray-100"
      [ngStyle]="{ 'border-color': color + '1a' }"
    >
      <p
        class="text-xs px-4 py-2 text-gray-400 uppercase transition-opacity duration-200 w-full "
      >
        {{ title }}
      </p>
      <ng-container *ngFor="let item of items; let i = index">
        <a
          [routerLink]="item.path"
          routerLinkActive="active"
          class="flex items-center gap-2 p-2 rounded-xl transition-colors text-gray-500"
          [ngStyle]="{
            'background-color': 'transparent',
            color: color
          }"
          (mouseover)="hovered = i"
          (mouseleave)="hovered = null"
          [style.background-color]="
            hovered === i ? color + '4a' : 'transparent'
          "
        >
          <i-lucide [img]="item.icon" [size]="20"></i-lucide>
          <span class="font-normal">{{ item.label }}</span>
        </a>
      </ng-container>
    </div>
  `,
  styles: [
    `
      a {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      a.active {
        background-color: var(--menu-color, #482778) !important;
        color: #fff !important;
      }
      a:hover {
        background-color: var(--menu-color, #482778) 33;
        color: var(--menu-color, #482778);
      }
    `,
  ],
})
export class SidebarMenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() color: string = '#482778';
  @Input() title: string = 'opciones';
  hovered: number | null = null;
}
