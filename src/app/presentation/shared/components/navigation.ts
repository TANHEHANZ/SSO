import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface NavItem {
  label: string;
  icon?: any;
  color?: string;
}

@Component({
  selector: 'navigation-component',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col justify-center items-center">
      <p
        class="text-xs p-4 text-gray-400 uppercase transition-opacity duration-200 w-full text-center"
      >
        {{ label }}
      </p>
      <div
        (click)="onClick.emit()"
        [class.bg-opacity-10]="active"
        [class.text-white]="active"
        [style.backgroundColor]="active ? color + '1a' : ''"
        [style.color]="active ? color : ''"
        class="p-4 flex justify-between cursor-pointer text-gray-500 dark:text-gray-300
         transition-all duration-200 rounded-lg hover:bg-opacity-20 "
      >
        <i-lucide
          *ngIf="icon"
          [img]="icon"
          class="text-inherit transition-transform duration-200"
          [size]="18"
        />
      </div>
    </div>
  `,
})
export class NavigationComponent {
  @Input() label = '';
  @Input() icon: any;
  @Input() active: boolean = false;
  @Input() color: string = '';
  @Output() onClick = new EventEmitter<void>();
}
