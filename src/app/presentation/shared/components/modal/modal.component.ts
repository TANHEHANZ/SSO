import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@app/infraestructure/global/modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    @if (modalS.isOpen$ | async) {
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div
        class="absolute inset-0 bg-white/40 backdrop-blur-sm"
        (click)="modalS.close()"
      ></div>

      <div
        class="relative bg-white rounded-lg  border border-gray-300 max-w-lg w-full mx-4 z-10"
      >
        <div class="p-6">
          <p
            (click)="modalS.close()"
            class="w-8 h-8 hover:bg-gray-200  rounded-lg flex justify-center items-center cursor-pointer"
          >
            ✕
          </p>
          @if (modalS.modalContent$ | async; as content) {
          <ng-container [ngTemplateOutlet]="content"></ng-container>
          }
        </div>
      </div>
    </div>
    }
  `,
})
export class ModalComponent {
  modalS = inject(ModalService);
}
