import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@app/infraestructure/services/config.service';
import { NavResponseDTO } from '@app/infraestructure/models/nav/response.nav';
import { IconMapping, iconMapping } from '../../ui/icons/icon.component';
import { Router } from '@angular/router';
import { ColorService } from '@app/infraestructure/global/colors.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <!-- DEPRECADO -->
    <nav class="flex h-full relative">
      <div
        class="w-[100px] bg-white dark:bg-dark-background border-r border-gray-100 dark:border-gray-900 flex flex-col justify-start items-center gap-2 overflow-hidden pt-4"
      >
        @for(item of navItems; track item.id) {
        <div
          class="flex flex-col gap-2 justify-center items-center rounded-lg w-full cursor-pointer z-10"
          (click)="handleItemClick(item)"
        >
          <fa-icon
            [icon]="getIcon(item.icon)"
            class="w-12 h-12 rounded-xl text-gray-400 transition-colors flex justify-center items-center"
            [ngStyle]="{
              'background-color':
                item.id === activeItemId
                  ? item.color + '2a'
                  : item.color + '0a',
              color: item.color
            }"
          >
            ></fa-icon
          >
          <p
            class="text-xs uppercase transition-colors text-gray-500 overflow-hidden whitespace-nowrap text-center w-[70%]"
            style="text-overflow: ellipsis;"
          >
            {{ item.name }}
          </p>
        </div>
        }
      </div>

      @if(activeItem?.children?.length) {
      <div
        class="w-64 bg-white dark:bg-dark-background border-r border-gray-100 dark:border-gray-900 p-4 relative z-20"
      >
        <h3 class="text-lg text-gray-500 mb-4">Opciones</h3>
        <div class="flex flex-col gap-2">
          @for(child of activeItem.children; track child.id) {
          <div
            class="flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-colors"
            (click)="handleChildClick(child)"
            [ngStyle]="{
              'background-color':
                child.id === activeChildId
                  ? activeItem.color + '1a'
                  : childHovered === child.id
                  ? activeItem.color + '2a'
                  : 'transparent',
              color: activeItem.color
            }"
            (mouseenter)="childHovered = child.id"
            (mouseleave)="childHovered = null"
          >
            <fa-icon
              [icon]="getIcon(child.icon)"
              [ngStyle]="{ color: activeItem.color }"
            ></fa-icon>
            <span class="text-sm">{{ child.name }}</span>
          </div>
          }
        </div>
      </div>
      }
    </nav>
  `,
})
export class NavComponent implements OnInit {
  navS = inject(ConfigService);
  colorS = inject(ColorService);
  navItems: NavResponseDTO = [];
  activeItemId: string | null = null;
  activeItem: any = null;
  childHovered: string | null = null;
  activeChildId: string | null = null;
  private router = inject(Router);

  ngOnInit(): void {
    this.navS.getAllNavItems().subscribe((res) => {
      this.navItems = res;
      const colorMap: Record<string, string> = {};
      res.forEach((item: NavResponseDTO) => {
        if (item.name && item.color) {
          colorMap[item.name] = item.color;
        }
        item.children?.forEach((child: NavResponseDTO) => {
          if (child.name && item.color) {
            colorMap[child.name] = item.color;
          }
        });
      });

      // Set all colors at once
      this.colorS.setColors(colorMap);
    });
  }

  handleItemClick(item: any): void {
    if (this.activeItemId === item.id) {
      this.activeItemId = null;
      this.activeItem = null;
    } else {
      this.activeItemId = item.id;
      this.activeItem = item;

      if (item.path && item.children?.length === 0) {
        this.router.navigate([item.path]);
      }
    }
  }
  handleChildClick(child: any): void {
    this.activeChildId = child.id;
    if (child.path) {
      this.router.navigate([child.path]);
    }
  }
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
