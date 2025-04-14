import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './infraestructure/global/theme.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  template: ` <div
    class="min-h-screen w-full bg-white dark:bg-slate-900 transition-all duration-200"
  >
    <router-outlet></router-outlet>
  </div>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}
}
