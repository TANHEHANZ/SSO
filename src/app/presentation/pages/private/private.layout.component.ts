import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { Header } from '../../shared/components/heder/heder';
import { TopNavComponent } from '../../shared/components/topNav/top.nav.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, TopNavComponent],
  template: `
    <div
      class="min-h-screen  flex flex-col background-pathern-2 dark:bg-dark-surface"
    >
      <top-nav></top-nav>
      <main class="flex-1 p-8 w-full h-full ">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class LayoutComponent {}
