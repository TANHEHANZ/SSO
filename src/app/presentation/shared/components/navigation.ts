import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChevronDown, ChevronRight, LucideAngularModule } from 'lucide-angular';

interface NavItem {
  path: string;
  label: string;
  icon?: any;
  children?: NavItem[];
}

@Component({
  selector: 'navigation-component',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="flex flex-col w-full gap-1">
      <p class="text-xs p-4 text-gray-400 uppercase">{{ title }}</p>
      <div *ngFor="let item of items">
        <div
          [routerLink]="item.children ? null : item.path"
          (click)="item.children && toggleMenu(item)"
          routerLinkActive="bg-[#4AC1E01a] border-r-4 border-primary-theme_cian text-primary-theme_cian"
          class="w-full p-4 flex justify-between items-center cursor-pointer text-gray-500 dark:text-gray-300
            hover:bg-[#4AC1E01a] hover:border-r-4 hover:border-primary-theme_cian hover:text-primary-theme_cian 
            transition-all duration-200"
        >
          <div class="flex items-center gap-2">
            <i-lucide
              *ngIf="item.icon"
              [img]="item.icon"
              class="text-inherit"
              [size]="24"
            />
            {{ item.label }}
          </div>
          <i-lucide
            *ngIf="item.children"
            [img]="expandedItems[item.label] ? ChevronDown : ChevronRight"
            class="text-inherit"
            [size]="18"
          />
        </div>

        <div
          *ngIf="item.children"
          class="overflow-hidden transition-all duration-200"
          [class.h-0]="!expandedItems[item.label]"
        >
          <div
            *ngFor="let child of item.children"
            [routerLink]="child.path"
            routerLinkActive="text-primary-theme_cian"
            class="w-full pl-8 p-2 flex items-center gap-2 cursor-pointer text-gray-500 dark:text-gray-300
              hover:text-primary-theme_cian transition-colors"
          >
            <i-lucide
              *ngIf="child.icon"
              [img]="child.icon"
              class="text-inherit"
              [size]="20"
            />
            {{ child.label }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavigationComponent {
  @Input() items: NavItem[] = [];
  @Input() title = '';

  expandedItems: Record<string, boolean> = {};
  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;

  toggleMenu(item: NavItem) {
    this.expandedItems[item.label] = !this.expandedItems[item.label];
  }
}
