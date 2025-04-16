import {
  Component,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import {
  CircleCheckBig,
  X,
  CircleAlert,
  RefreshCcw,
  Trash2,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div
        *ngFor="let toast of toastService.toasts$Observable | async"
        class="opacity-0 min-w-[300px] border p-2 rounded-xl dark:border-gray-600 bg-white dark:bg-gray-800 flex overflow-hidden relative flex-col justify-start items-start"
        #toastElement
      >
        <button
          (click)="removeToast(toast.id!, toastElement)"
          class="absolute top-2 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <lucide-angular [img]="closeIcon" [size]="16"></lucide-angular>
        </button>

        <div class="flex gap-4 justify-center items-center w-full">
          <div
            class="w-1 h-full min-h-[50px] rounded-full"
            [ngClass]="{
              'bg-green-500': toast.type === 'success',
              'bg-red-500': toast.type === 'error',
              'bg-blue-500': toast.type === 'info',
              'bg-blue-400': toast.type === 'update',
              'bg-orange-500': toast.type === 'delete'
            }"
          ></div>

          <lucide-angular
            [img]="getToastIcon(toast.type)"
            [ngClass]="{
              'text-green-500': toast.type === 'success',
              'text-red-500': toast.type === 'error',
              'text-blue-500': toast.type === 'info',
              'text-blue-400': toast.type === 'update',
              'text-orange-500': toast.type === 'delete'
            }"
          ></lucide-angular>

          <section class="flex flex-col flex-1">
            <span class="font-medium text-gray-800 dark:text-white">{{
              toast.title
            }}</span>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{
              toast.description
            }}</span>
          </section>
        </div>

        <section
          *ngIf="toast.action"
          class="flex gap-2 justify-center items-center w-full mt-2"
        >
          <button
            class="flex-1 rounded-lg py-2 text-sm border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            (click)="removeToast(toast.id!, toastElement)"
          >
            Cancelar
          </button>
          <button
            class="flex-1 rounded-lg py-2 text-sm border bg-primary-theme_purple text-white hover:bg-opacity-90 transition-colors"
            (click)="toast.action.callback()"
          >
            {{ toast.action.label }}
          </button>
        </section>
      </div>
    </div>
  `,
})
export class ToastComponent implements AfterViewInit {
  @ViewChildren('toastElement') toastElements!: QueryList<ElementRef>;

  readonly successIcon = CircleCheckBig;
  readonly closeIcon = X;
  readonly errorIcon = CircleAlert;
  readonly updateIcon = RefreshCcw;
  readonly deleteIcon = Trash2;

  constructor(public toastService: ToastService) {}

  getToastIcon(type: string) {
    switch (type) {
      case 'success':
        return this.successIcon;
      case 'error':
        return this.errorIcon;
      case 'info':
        return this.errorIcon;
      case 'update':
        return this.updateIcon;
      case 'delete':
        return this.deleteIcon;
      default:
        return this.errorIcon;
    }
  }

  ngAfterViewInit() {
    this.toastElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      if (elements.length > 0) {
        const newToast = elements.last;
        this.animateNewToast(newToast.nativeElement);
      }
    });
  }

  private animateNewToast(element: HTMLElement) {
    gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      }
    );
  }

  removeToast(id: string, element: HTMLElement) {
    gsap.to(element, {
      opacity: 0,
      x: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => this.toastService.removeToast(id),
    });
  }
}
