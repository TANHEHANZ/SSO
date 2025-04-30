import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ColorService } from '../../../../infraestructure/global/colors.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface MenuItem {
  path: string;
  label: string;
  icon: any;
  color?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div
      class="p-4 h-full flex flex-col gap-4 rounded-r-xl"
      [ngStyle]="{
        'background-color': color + '1a'
      }"
    >
      <ng-container *ngFor="let item of items; let i = index">
        <a
          [routerLink]="item.path"
          routerLinkActive="active"
          class="flex items-center gap-2 p-2 rounded-lg transition-colors"
          [ngStyle]="{
            'background-color': 'transparent',
            color: color
          }"
          (mouseover)="hovered = i"
          (mouseleave)="hovered = null"
          [style.background-color]="
            hovered === i ? color + '33' : 'transparent'
          "
        >
          <i-lucide [img]="item.icon" [size]="20"></i-lucide>
          <span class="font-normal">{{ item.label }}</span>
        </a>
      </ng-container>
    </div>
  `,
  styles: [
    `
      a {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      a.active {
        background-color: var(--menu-color, #482778) !important;
        color: #fff !important; /* Contraste para texto */
      }
      a:hover {
        background-color: var(--menu-color, #482778) 33; /* Fondo con opacidad */
        color: var(--menu-color, #482778);
      }
    `,
  ],
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  @Input() items: MenuItem[] = [];
  @Input() color: string = '#482778';

  hovered: number | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private colorService: ColorService) {}

  ngOnInit(): void {
    const routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.colorService.color$.subscribe(() => {
          this.colorService.setColor(this.color);
        });
      });

    this.subscriptions.add(routerSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
