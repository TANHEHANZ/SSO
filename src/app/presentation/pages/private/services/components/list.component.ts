import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button';
import { DrawerService } from '@app/infraestructure/global/drawer.service';
import {
  IconMapping,
  iconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanelService } from '@app/infraestructure/services/components/panel.service';

@Component({
  selector: 'service-list',
  template: `
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
        (click)="drawerS.openDrawer()"
      >
        <fa-icon [icon]="getIcon('Roket')" class="inherit" />
        Empezar</app-button
      >
    </div>
  `,
  imports: [ButtonComponent, FontAwesomeModule],
})
export class ListService {
  drawerS = inject(PanelService);

  ngOnInit() {}

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
