import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button';
import { InputComponent } from '../../../../../shared/ui/input';
import {
  IconMapping,
  iconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  imports: [ButtonComponent, InputComponent, CommonModule, FontAwesomeModule],
})
export class ProyectsComponent {
  proyects = [
    {
      name: 'Firmas Gamc',
      service: 'Autenticación',
      Domains: 'https:firmagamc.dev.cochamba.bo',
      method: [
        {
          method: 'google',
        },
        {
          method: 'ci',
        },
      ],
      fechaCreacion: '2024-01-15',
      estado: 'ACTIVO',
    },
  ];

  isDropdownOpen = false;
  filterOptions = ['Más recientes', 'Más antiguos', 'Por nombre'];

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
