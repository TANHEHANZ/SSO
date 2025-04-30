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
      #layoutContainer
      class="min-h-screen bg-gray-50 dark:bg-dark-background  w-full transition-all duration-300  "
    >
      <app-header></app-header>
      <main class="flex flex-1 h-[calc(100vh-8dvh)]">
        <app-nav class="h-full" />
        <div class="p-6 flex-1 overflow-auto ">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  // private navState = inject(NavStateService);
  // ngOnInit() {
  //   this.navState.isExpanded$.subscribe((isExpanded) => {
  //     gsap.to('.grid', {
  //       gridTemplateColumns: isExpanded ? '330px 1fr' : '120px 1fr',
  //       duration: 0.3,
  //       ease: 'power2.inOut',
  //     });
  //   });
  // }
}
