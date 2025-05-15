import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../../../../shared/ui/button';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { DrawerService } from '@app/infraestructure/global/drawer.service';
import { DrawerComponent } from '../../../../../shared/components/drawer/drawer.component';
import { LayoutSteperComponent } from './steps/layout.steper.component';
import { IntegrationService } from '@app/infraestructure/services/integration.service';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { ToastComponent } from '../../../../../../infraestructure/lib/toast/toast.component';
import { ClientServicePanelComponent } from './panel/panel.component';

@Component({
  imports: [
    FontAwesomeModule,
    ButtonComponent,
    DrawerComponent,
    LayoutSteperComponent,
    CommonModule,
    ToastComponent,
    ClientServicePanelComponent,
  ],
  template: `
    <app-toast></app-toast>
    <app-drawer title="Configuracion de integración">
      <app-layout-steper />
    </app-drawer>

    <div class="h-[70dvh] flex justify-center items-center flex-col col-span-3">
      <fa-icon
        [icon]="getIcon('Layer')"
        class="text-4xl text-primary-theme_purple"
      />
      <h2 class="text-3xl font-bold">
        ¿Aun
        <strong class="text-primary-theme_purple">no usaste</strong> nuestros
        servicios?
      </h2>

      <p class="text-md text-gray-600">
        Integra nuestros servicios sin complicaciones
      </p>
      <app-button
        [variant]="'primary'"
        class="max-w-56 max-h-14"
        (click)="drawerS.open()"
      >
        <fa-icon [icon]="getIcon('Roket')" class="inherit" />
        Empezar</app-button
      >
    </div>
    <client-service-panel />
  `,
})
export class ClientIntegracionesComponent implements OnInit {
  drawerS = inject(DrawerService);

  ngOnInit() {}

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
