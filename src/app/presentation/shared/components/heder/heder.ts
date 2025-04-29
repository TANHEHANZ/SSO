import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  User,
  Sun,
  Moon,
  LogOut,
  UserCog,
  Menu,
} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NavStateService } from '@app/infraestructure/global/nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  template: `
    <div
      class="w-full bg-white dark:bg-gray-800  h-[8dvh]  border-b dark:border-b-gray-500 flex justify-between items-center p-4"
    >
      <img
        [src]="'./assets/images/logo.png'"
        alt="Logo"
        class="h-full w-auto object-contain aspect-[3/1] transition-all duration-300 "
      />

      <div class="relative">
        <div
          (click)="toggleDropdown()"
          class=" py-2 px-4 flex gap-2 justify-center items-center rounded-xl"
        >
          <div class="flex flex-col justify-end items-end ">
            <p class="text-md text-gray-500 ">Hanz Limber Tapia Choque</p>
            <p class="text-xs text-gray-400 ">Administrador</p>
          </div>
          <strong
            class="rounded-full bg-primary-theme_purple/20 text-gray-600 p-2 relative"
          >
            <i-lucide [img]="user" class="text-inherit" [size]="24" />
          </strong>
        </div>

        <div
          *ngIf="isOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50
          border dark:bg-gray-800 dark:border-gray-700"
        >
          <a
            routerLink="/admin/profile"
            class="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <i-lucide [img]="userCog" [size]="18" />
            Perfil
          </a>
          <button
            (click)="toggleTheme()"
            class="w-full flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <i-lucide [img]="isDark ? sun : moon" [size]="18" />
            {{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}
          </button>
          <div class="border-t dark:border-gray-700 my-1"></div>
          <button
            (click)="logout()"
            class="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i-lucide [img]="logOut" [size]="18" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Header {
  readonly user = User;
  readonly userCog = UserCog;
  readonly sun = Sun;
  readonly moon = Moon;
  readonly logOut = LogOut;

  isOpen = false;
  isDark = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark');
  }
  private navState = inject(NavStateService);
  readonly menu = Menu;

  toggleNav() {
    this.navState.toggleNav();
  }

  logout() {
    // Implement logout logic
    console.log('Logging out...');
  }
}
