import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerService } from '@app/infraestructure/global/drawer.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-y-2 right-2 w-[400px] rounded-lg bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-x-hidden overflow-y-auto"
      [class.translate-x-[110%]]="!(drawerService.isOpen$ | async)"
    >
      <div class="h-full flex flex-col">
        <div
          class="p-2 border-b dark:border-gray-700 flex justify-between items-center"
        >
          <button
            (click)="drawerService.close()"
            class="w-8 h-8 hover:bg-gray-200  rounded-lg"
          >
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <h2 class="text-lg my-4 mb-8">{{ title }}</h2>
          <ng-content></ng-content>
        </div>
      </div>
    </div>

    <div
      *ngIf="drawerService.isOpen$ | async"
      class="fixed inset-0  bg-black/50 transition-opacity z-20"
      (click)="drawerService.close()"
    ></div>
  `,
})
export class DrawerComponent {
  @Input() title: string = '';
  drawerService = inject(DrawerService);
}
