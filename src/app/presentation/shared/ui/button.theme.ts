import { Component, inject } from '@angular/core';
import { ThemeService } from '@app/infraestructure/global/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'change-theme',
  imports: [LucideAngularModule],
  template: `<button
    (click)="themeService.toggleDarkMode()"
    class="fixed top-4 right-4 p-2 rounded-lg bg-primary-theme_purple text-white hover:bg-primary-theme_purple/70    transition-colors z-30"
  >
    <lucide-angular
      [img]="sun"
      class="w-6 h-6 block dark:hidden"
    ></lucide-angular>
    <lucide-angular
      [img]="mon"
      class="w-6 h-6 hidden dark:block text-white"
    ></lucide-angular>
  </button>`,
})
export class ButtonChangeTheme {
  themeService = inject(ThemeService);
  readonly sun = Sun;
  readonly mon = Moon;
}
