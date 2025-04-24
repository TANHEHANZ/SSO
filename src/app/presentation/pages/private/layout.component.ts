import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { Header } from '../../shared/components/heder/heder';
import { NavStateService } from '@app/infraestructure/global/nav.service';
import gsap from 'gsap';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, Header],
  template: `
    <div
      #layoutContainer
      class="min-h-screen bg-gray-50 dark:bg-gray-900 grid w-full transition-all duration-300"
      [style.gridTemplateColumns]="'auto 1fr'"
    >
      <app-nav />

      <main
        class="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 h-full"
      >
        <app-header></app-header>
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  private navState = inject(NavStateService);

  ngOnInit() {
    this.navState.isExpanded$.subscribe((isExpanded) => {
      gsap.to('.grid', {
        gridTemplateColumns: isExpanded ? '330px 1fr' : '80px 1fr',
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });
  }
}
