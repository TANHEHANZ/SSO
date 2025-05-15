import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerService } from '@app/infraestructure/global/drawer.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed bottom-0 right-0 w-1/2 h-[85dvh] rounded-lg bg-white  transform transition-transform duration-300 ease-in-out z-50 overflow-x-hidden overflow-y-auto border border-gray-300 "
      [class.translate-x-[110%]]="!(drawerService.isOpen$ | async)"
    >
      <div class="h-full flex flex-col">
        <div
          class="p-8 border-b dark:border-gray-700 flex justify-between items-center"
        >
          <h2 class="text-3xl ">{{ title }}</h2>
          <button
            (click)="drawerService.close()"
            class="w-8 h-8 hover:bg-gray-200  rounded-lg"
          >
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>

    <div
      *ngIf="drawerService.isOpen$ | async"
      class="fixed inset-0   transition-opacity z-20"
      (click)="drawerService.close()"
    ></div>
  `,
})
export class DrawerComponent {
  @Input() title: string = '';
  drawerService = inject(DrawerService);
}
