import { Component } from '@angular/core';
import { Dot, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'navigation-children',
  template: `
    <div
      class="p-4 flex gap-2 hover:bg-primary-backgraund hover:text-primary-theme_cian  group"
    >
      <i-lucide
        [img]="Dot"
        [strokeWidth]="6"
        class="text-gray-300   group-hover:text-inherit"
      />

      <ng-content></ng-content>
    </div>
  `,
  imports: [LucideAngularModule],
})
export class NavigationChildren {
  readonly Dot = Dot;
}
