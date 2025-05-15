import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../../shared/components/heder/heder';
import { ToastComponent } from '../../../../../infraestructure/lib/toast/toast.component';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { TopNavComponent } from '../../../../shared/components/topNav/top.nav.component';

@Component({
  imports: [
    RouterOutlet,
    Header,
    ToastComponent,
    NavComponent,
    TopNavComponent,
  ],
  selector: 'app-client-layout',
  template: ` <div
    class="min-h-screen flex flex-col bg-primary-backgraund dark:bg-dark-surface"
  >
    <app-toast></app-toast>
    <top-nav></top-nav>

    <main class="flex-1 p-6 max-w-screen-2xl w-full h-full mx-auto">
      <router-outlet></router-outlet>
    </main>
  </div>`,
})
export class ClientLayoutComponent {}
