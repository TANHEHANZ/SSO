import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <i-lucide
      [name]="name"
      [size]="size"
      [color]="color"
      [strokeWidth]="strokeWidth"
    ></i-lucide>
  `,
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() color?: string;
  @Input() strokeWidth: number = 2;
}
