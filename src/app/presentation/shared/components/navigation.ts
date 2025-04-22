import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavStateService } from '@app/infraestructure/global/nav.service';
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
    <div class="flex flex-col w-full gap-1 overflow-hidden">
      <p
        class="text-xs p-4 text-gray-400 uppercase transition-opacity duration-200 "
        [class.opacity-0]="collapsed"
      >
        {{ title }}
      </p>
      <div *ngFor="let item of items">
        <div
          [routerLink]="item.children ? null : item.path"
          (click)="item.children && toggleMenu(item)"
          routerLinkActive="bg-[#4AC1E01a] border-r-4 border-primary-theme_cian text-primary-theme_cian"
          class="w-full p-4 flex justify-between items-center cursor-pointer text-gray-500 dark:text-gray-300
            hover:bg-[#4AC1E01a] hover:border-r-4 hover:border-primary-theme_cian hover:text-primary-theme_cian 
            transition-all duration-200"
        >
          <div
            class="flex items-center transition-all duration-200"
            [class.justify-center]="collapsed"
            [class.w-full]="collapsed"
          >
            <i-lucide
              *ngIf="item.icon"
              [img]="item.icon"
              class="text-inherit transition-transform duration-200"
              [class.transform]="collapsed"
              [class.translate-x-2]="!collapsed"
              [size]="24"
            />
            <span
              class="ml-4 transition-all duration-200 origin-left"
              [class.opacity-0]="collapsed"
              [class.scale-0]="collapsed"
              [style.width]="collapsed ? '0' : 'auto'"
            >
              {{ item.label }}
            </span>
          </div>
          <i-lucide
            *ngIf="item.children"
            [img]="expandedItems[item.label] ? ChevronDown : ChevronRight"
            class="text-inherit transition-opacity duration-200"
            [class.opacity-0]="collapsed"
            [class.hidden]="collapsed"
            [size]="18"
          />
        </div>

        <div
          *ngIf="item.children"
          class="overflow-hidden transition-all duration-200 relative"
          [class.h-0]="!expandedItems[item.label]"
        >
          <div
            *ngFor="let child of item.children"
            [routerLink]="child.path"
            routerLinkActive="text-primary-theme_cian"
            class="w-full pl-8 p-2 flex items-center gap-2 cursor-pointer text-gray-500 dark:text-gray-300
              hover:text-primary-theme_cian transition-colors group"
            [class.justify-center]="collapsed"
            [class.pl-0]="collapsed"
            [class.bg-gray-50]="collapsed"
          >
            <i-lucide
              *ngIf="child.icon"
              [img]="child.icon"
              class="text-inherit transition-transform duration-200"
              [size]="20"
            />
            <span
              class="transition-all duration-200 origin-left ml-2 whitespace-nowrap"
              [class.opacity-0]="collapsed"
              [class.scale-0]="collapsed"
              [class.absolute]="collapsed"
              [class.left-full]="collapsed"
              [class.ml-4]="collapsed"
              [class.bg-white]="collapsed"
              [class.dark:bg-gray-800]="collapsed"
              [class.p-2]="collapsed"
              [class.rounded-md]="collapsed"
              [class.shadow-lg]="collapsed"
              [class.invisible]="collapsed"
              [class.group-hover:visible]="collapsed"
            >
              {{ child.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavigationComponent implements OnInit {
  @Input() items: NavItem[] = [];
  @Input() title = '';
  navStateS = inject(NavStateService);
  collapsed = false;
  expandedItems: Record<string, boolean> = {};
  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;
  ngOnInit(): void {
    this.navStateS.isExpanded$.subscribe((value) => {
      console.log(value);
      this.collapsed = !value;
    });
  }

  toggleMenu(item: NavItem) {
    this.expandedItems[item.label] = !this.expandedItems[item.label];
  }
}
