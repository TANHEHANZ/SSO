import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '@app/infraestructure/global/modal.service';
import { IntegrationDTO } from '@app/infraestructure/models/integrations/integraion.response';
import { IntegrationService } from '@app/infraestructure/services/integration.service';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from '../../../../../../../shared/components/modal/modal.component';
import { OptionsServicesComponent } from './options.services.component';
import { CardComponent } from '../../../../../../../shared/components/card/card.component';

@Component({
  selector: 'app-services-step',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    ModalComponent,
    OptionsServicesComponent,
    CardComponent,
  ],

  template: `
    <app-modal />
    <ng-template #optionsModal>
      <app-options-services
        [serviceName]="selectedService?.name || ''"
        [options]="selectedService?.options || []"
      />
    </ng-template>
    <article class="h-full w-full grid grid-cols-3 gap-2">
      @for (service of services; track service.id) {

      <app-card
        [value]="service"
        [isSelected]="isSelected(service.id)"
        [multiSelect]="false"
        [description]="service.description"
        (selected)="onServiceSelect($event.value)"
      >
        <div class="flex items-center gap-1 flex-col">
          <fa-icon [icon]="getIcon(service.icon)" class="text-2xl"></fa-icon>
          <h3>{{ service.name }}</h3>
        </div>
      </app-card>

      }@empty {
      <div>
        <p>No hay servicios disponibles</p>
      </div>
      }
    </article>
  `,
})
export class ClientServiceStepComponent {
  integrationS = inject(IntegrationService);
  modalS = inject(ModalService);
  @ViewChild('optionsModal') optionsModal!: TemplateRef<any>;
  selectedService: IntegrationDTO | null = null;
  // es momento de traer mediante el backend los servicios disponibles para el cliente

  onServiceSelect(service: IntegrationDTO) {
    this.selectedService = service;
    this.integrationS.updateServiceConfig(service);
    if (service.options?.length) {
      this.openModal(this.optionsModal);
    }
  }

  isSelected(serviceId: string): boolean {
    return this.integrationS.getFullConfiguration().services?.id === serviceId;
  }

  openModal(templateRef: TemplateRef<any>) {
    this.modalS.open(templateRef);
  }
  //   cosas del dom
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  services: IntegrationDTO[] = [
    {
      id: '1',
      name: 'Autenticación',
      description:
        'Proporciona servicios de autenticación y autorización para proteger tus recursos.',
      icon: 'ShieldAlt',
      options: [
        {
          id: '1',
          name: 'Interna',
          description:
            'Permite validar credenciales contra directorios internos y sistemas propios de la GAMC',
          icon: 'ShieldAlt',
        },
        {
          id: '2',
          name: 'Externa',
          description:
            'ideal para el acceso a ciudadanos y terceros, manteniendo la seguridad y el control de acceso.',
          icon: 'Earth',
        },
      ],
    },
    {
      id: '2',
      name: 'Validación de documentos',
      description:
        'Permite validar documentos que han sido firmados por jacubitus',
      icon: 'FolderOpen',
    },
  ] as const;
}
