import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelService } from '@app/infraestructure/services/components/panel.service';
import { IconComponent, IconName } from '../../ui/icons/icon';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      *ngIf="initialized"
      class="fixed inset-0 z-50 bg-black/30 flex justify-end transition-opacity duration-300"
      [class.opacity-0]="!isOpen"
      [class.pointer-events-none]="!isOpen"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      (click)="closeDrawer()"
    >
      <aside
        class="bg-white z-50 h-[96dvh] my-auto  rounded-lg w-auto min-w-[50dvw]  transition-transform duration-300 ease-in-out transform"
        [ngClass]="isOpen ? '-translate-x-4' : 'translate-x-full'"
        (click)="$event.stopPropagation()"
      >
        <header
          class="flex items-center justify-between p-8 border-b border-gray-200"
        >
          <h2
            class="text-xl my-4 font-medium flex gap-4 self-start  justify-center items-center text-balance"
          >
            <p
              class="w-12 h-12 rounded-md text-primary-theme_purple grid content-center text-center border border-primary-theme_purple/50"
            >
              <app-icon *ngIf="icon" [name]="icon"></app-icon>
            </p>

            {{ title }}
          </h2>
          <button
            class=" w-12 h-12 rounded-lg flex justify-center items-center  text-xl bg-violet-200 hover:bg-primary-theme_purple hover:text-white transition-all duration-300 ease-in-out "
            (click)="closeDrawer()"
            aria-label="Cerrar drawer"
          >
            <app-icon name="close"></app-icon>
          </button>
        </header>
        <section class="p-8 bg-primary-theme_orage-light">
          <ng-content></ng-content>
        </section>
      </aside>
    </div>
  `,
})
export class DrawerComponent {
  @Input() title = '';
  @Input() icon: IconName | null = null;
  panelService = inject(PanelService);
  isOpen = false;
  initialized = false;

  constructor() {
    this.panelService.drawerState$.subscribe((state) => {
      this.isOpen = state;
      this.initialized = true;
    });
  }

  closeDrawer() {
    this.panelService.closeDrawer();
  }
}
