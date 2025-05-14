import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../../shared/components/heder/heder';
import { ToastComponent } from '../../../../../infraestructure/lib/toast/toast.component';
import { NavComponent } from '../../../../shared/components/nav/nav.component';

@Component({
  imports: [RouterOutlet, Header, ToastComponent, NavComponent],
  selector: 'app-client-layout',
  template: ` <div
    #layoutContainer
    class="min-h-screen bg-primary-backgraund dark:bg-dark-surface  w-full transition-all duration-300  "
  >
    <!-- <app-header></app-header> -->
    <app-toast></app-toast>

    <main class="flex flex-1 h-[calc(100vh-8dvh)]">
      <!-- <app-nav class="h-full" /> -->
      <div class="p-6 flex-1 overflow-auto ">
        <router-outlet></router-outlet>
      </div>
    </main>
  </div>`,
})
export class ClientLayoutComponent {}
