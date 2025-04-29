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
        [style.backgroundColor]="active ? color + '1a' : ''"
        [style.color]="active ? color : ''"
        class="p-4 flex justify-between cursor-pointer text-gray-500 dark:text-gray-300
          hover:text-primary-theme_cian transition-all duration-200 rounded-lg"
        [style.--hover-color]="color"
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
  @Input() color: string = '#4AC1E0'; // Default color
  @Output() onClick = new EventEmitter<void>();
}
