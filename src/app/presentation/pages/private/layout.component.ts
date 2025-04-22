import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { Header } from '../../shared/components/heder/heder';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, Header],
  template: `
    <div
      class="min-h-screen bg-gray-100 dark:bg-gray-900 grid grid-cols-[330px_1fr] flex-1 w-full"
    >
      <app-nav />

      <main class=" bg-primary-backgraund">
        <app-header></app-header>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {}
