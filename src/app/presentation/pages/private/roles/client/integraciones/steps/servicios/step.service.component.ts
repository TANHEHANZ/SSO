import { Component, inject } from '@angular/core';
import { IntegrationDTO } from '@app/infraestructure/models/integrations/integraion.response';
import { IntegrationService } from '@app/infraestructure/services/integration.service';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-services-step',
  template: `
    <article class="h-full w-full grid grid-cols-3 gap-2">
      @for (service of services; track service.id) {
      <div
        class="border rounded-lg min-h-32 p-4 cursor-pointer transition-all"
        [class]="
          isSelected(service.id)
            ? 'border-primary-theme_purple '
            : 'border-gray-200 hover:border-primary-theme_purple'
        "
        (click)="onServiceSelect(service)"
      >
        <div class="flex gap-4 justify-center items-center">
          <fa-icon [icon]="getIcon(service.icon)" class="inherit text-3xl" />
          <p class="text-xl">{{ service.name }}</p>
        </div>
        <p class="text-gray-400 text-xs">{{ service.desription }}</p>
      </div>

      }@empty {
      <div>
        <p>No hay servicios disponibles</p>
      </div>
      }
    </article>
  `,
  imports: [FontAwesomeModule],
})
export class ClientServiceStepComponent {
  integrationS = inject(IntegrationService);
  selectedServices: IntegrationDTO[] = [];

  onServiceSelect(service: IntegrationDTO) {
    const index = this.selectedServices.findIndex((s) => s.id === service.id);
    if (index === -1) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices.splice(index, 1);
    }
    this.integrationS.updateServiceConfig(service);
  }

  isSelected(serviceId: string): boolean {
    return this.selectedServices.some((service) => service.id === serviceId);
  }

  //   cosas del dom
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  services: IntegrationDTO[] = [
    {
      id: '1',
      name: 'Autenticación',
      desription:
        'Proporciona servicios de autenticación y autorización para proteger tus recursos.',
      icon: 'ShieldAlt',
    },
    {
      id: '2',
      name: 'Validación de documentos',
      desription:
        'Permite validar documentos que han sido firmados por jacubitus',
      icon: 'FolderOpen',
    },
  ] as const;
}
