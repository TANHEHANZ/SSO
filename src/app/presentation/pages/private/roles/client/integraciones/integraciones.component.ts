import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../../../../shared/ui/button';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';

@Component({
  imports: [FontAwesomeModule, ButtonComponent],
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
      <app-button [variant]="'primary'" class="max-w-56 max-h-14">
        <fa-icon [icon]="getIcon('Roket')" class="inherit" />
        Empezar</app-button
      >
    </div>
  `,
})
export class ClientIntegracionesComponent {
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
