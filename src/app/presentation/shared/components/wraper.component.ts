import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'wraper-component',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-2 ">
      <h1 class="font-light text-4xl ">{{ title }}</h1>
      <div class="flex items-center gap-1 text-sm ">
        @for (item of breadcrumbs; track $index) { @if ($index > 0) {
        <i-lucide [img]="ChevronRight" class="w-3.5 h-3.5 text-gray-400" />
        }
        <span
          class="px-2 py-1 rounded-md transition-all duration-200 hover:bg-opacity-10 cursor-pointer"
          [style.color]="$last ? color : 'gray'"
          [style.backgroundColor]="$last ? color + '1a' : 'transparent'"
          [style.fontWeight]="$last ? '500' : 'normal'"
        >
          {{ item }}
        </span>
        }
      </div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class WraperComponent {
  @Input() title: string = '';
  @Input() color: string = '#482778';
  @Input() breadcrumbs: string[] = [];
  readonly ChevronRight = ChevronRight;
}
