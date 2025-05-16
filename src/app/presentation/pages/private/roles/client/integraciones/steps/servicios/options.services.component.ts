import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { OptiosIntegrationServicesDTO } from '@app/infraestructure/models/integrations/integraion.response';
import { CardComponent } from '../../../../../../../shared/components/card/card.component';

@Component({
  selector: 'app-options-services',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CardComponent],
  template: `
    <article class="p-4">
      <header class="mb-6">
        <h2 class="text-2xl font-medium">Configuración de {{ serviceName }}</h2>
        <p class="text-gray-500">
          Selecciona el tipo de servicio que deseas implementar
        </p>
      </header>

      <div class="grid grid-cols-2 gap-4">
        @for (option of options; track option.id) {
        <app-card
          [value]="option"
          [isSelected]="isItemSelected(option)"
          [multiSelect]="false"
          [description]="option.description"
          (selected)="onItemSelected($event)"
        >
          <div class="flex items-center gap-2">
            <fa-icon [icon]="getIcon(option.icon)" class="text-2xl"></fa-icon>
            <h3>{{ option.name }}</h3>
          </div>
        </app-card>
        }
      </div>
    </article>
  `,
})
export class OptionsServicesComponent {
  @Input() serviceName: string = '';
  @Input() options: OptiosIntegrationServicesDTO[] = [];
  selectedItems: any[] = [];

  isItemSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  onItemSelected(event: { value: any; isSelected: boolean }) {
    if (event.isSelected) {
      this.selectedItems = [event.value];
    } else {
      this.selectedItems = [];
    }
  }
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  servicesDisponibles = [
    {
      id: '1',
      name: 'CI',
      servicio: 'Interna',
    },
    {
      id: '2',
      name: 'Google',
      servicio: 'Externa',
    },
    {
      id: '3',
      name: 'Email',
      servicio: 'Externa',
    },
  ];
}
