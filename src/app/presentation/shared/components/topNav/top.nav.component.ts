import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavResponseDTO } from '@app/infraestructure/models/nav/response.nav';
import { ConfigService } from '@app/infraestructure/services/config.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconMapping, iconMapping } from '../../ui/icons/icon.component';

@Component({
  selector: 'top-nav',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <nav class=" w-full bg-white border-b flex flex-col items-start px-4 py-2">
      <section class="py-4 flex justify-between w-full font-light">
        <button>
          <strong>NombreProyecto / </strong><small>Nombre Usuario</small>
        </button>
        <div class="flex gap-4 justify-center items-center">
          <button
            class="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-50"
          >
            <fa-icon
              [icon]="getIcon('Bell')"
              class="text-gray-600 text-sm"
            ></fa-icon>
          </button>

          <button
            class="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-50"
          >
            <fa-icon
              [icon]="getIcon('Bars')"
              class="text-gray-600 text-sm"
            ></fa-icon>
          </button>
        </div>
      </section>

      <div class="flex gap-2 ">
        @for (item of navItems; track item.id) {
        <div
          class="cursor-pointer relative"
          (mouseenter)="activeItem = item"
          (mouseleave)="activeItem = null"
        >
          <div class="hover:bg-gray-100 py-1 px-2 rounded-lg ">
            <span class="text-sm ">{{ item.name }}</span>
          </div>

          @if (item.children?.length && activeItem === item) {
          <div
            class="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50"
          >
            @for (child of item.children; track child.id) {
            <div
              class="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              (click)="navigate(child.path)"
            >
              <fa-icon
                [icon]="getIcon(child.icon)"
                [style.color]="item.color"
                class="text-sm"
              ></fa-icon>
              <span class="text-sm">{{ child.name }}</span>
            </div>
            }
          </div>
          }
        </div>
        }
      </div>
    </nav>
  `,
})
export class TopNavComponent implements OnInit {
  navS = inject(ConfigService);
  private router = inject(Router);
  navItems: NavResponseDTO = [];
  activeItem: any = null;

  ngOnInit(): void {
    this.navS.getAllNavItems().subscribe((res) => {
      this.navItems = res;
    });
  }

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.activeItem = null;
  }
}
