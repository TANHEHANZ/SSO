import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { OptiosIntegrationServicesDTO } from '@app/infraestructure/models/integrations/integraion.response';
import { CardComponent } from '../../../../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../../../../shared/ui/button';
import { StepperComponent } from '../../../../../../../shared/components/step/stape.component';
import { GoogleIconComponent } from '../../../../../../../shared/ui/icons/google';

@Component({
  selector: 'app-options-services',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CardComponent,
    ButtonComponent,
    StepperComponent,
    GoogleIconComponent,
  ],
  template: `
    <app-stepper
      [totalSteps]="3"
      (stepChange)="onStepChange($event)"
      [isNextDisabled]="!canProceedToNextStep"
      [title]="serviceName"
      description="Selecciona un servicio"
    >
      <ng-template>
        <article class="p-4 flex flex-col gap-6 justify-center items-center">
          <div class="grid grid-cols-2 gap-4 w-full">
            @for (option of options; track option.id) {
            <app-card
              [value]="option"
              [isSelected]="isItemSelected(option)"
              [multiSelect]="false"
              [description]="option.description"
              (selected)="onItemSelected($event)"
            >
              <div class="flex items-center gap-2">
                <fa-icon
                  [icon]="getIcon(option.icon)"
                  class="text-2xl"
                ></fa-icon>
                <h3>{{ option.name }}</h3>
              </div>
            </app-card>
            }
          </div>
        </article>
      </ng-template>

      <ng-template>
        <div class="grid grid-cols-2  w-full gap-4">
          @for (method of selectedService?.metods || []; track method.id) {
          <app-card
            [value]="method"
            [isSelected]="isMethodSelected(method)"
            [multiSelect]="true"
            [description]="method.description"
            (selected)="onMethodSelected($event)"
          >
            <div class="flex flex-col items-center gap-2">
              @if (method.name === 'Google') {
              <app-google-icon class="text-2xl" />
              } @else {
              <fa-icon [icon]="getIcon(method.icon)" class="text-2xl"></fa-icon>
              }
              <h3>{{ method.name }}</h3>
            </div>
          </app-card>
          }
        </div>
      </ng-template>

      <ng-template> Contenido del paso 3 </ng-template>
    </app-stepper>
  `,
})
export class OptionsServicesComponent {
  onStepChange(step: number) {
    console.log(step);
    console.log(this.selectedService);
  }

  @Input() serviceName: string = '';
  @Input() options: OptiosIntegrationServicesDTO[] = [];
  @Output() complete = new EventEmitter<any>();

  currentStep: 'service' | 'methods' = 'service';
  selectedService: any | null = null;
  selectedMethods: any[] = [];

  get canProceed(): boolean {
    if (this.currentStep === 'service') {
      return !!this.selectedService;
    }
    return this.selectedMethods.length > 0;
  }

  isItemSelected(item: OptiosIntegrationServicesDTO): boolean {
    return this.selectedService === item;
  }

  isMethodSelected(method: any): boolean {
    return this.selectedMethods.includes(method);
  }

  get canProceedToNextStep(): boolean {
    if (this.currentStep === 'service') {
      return !!this.selectedService?.metods?.length;
    }
    return this.selectedMethods.length > 0;
  }

  onItemSelected(event: {
    value: OptiosIntegrationServicesDTO;
    isSelected: boolean;
  }) {
    if (event.isSelected) {
      this.selectedService = event.value;
      if (!this.selectedService?.metods?.length) {
        this.selectedService = null;
      }
    } else {
      this.selectedService = null;
    }
  }

  onMethodSelected(event: { value: any; isSelected: boolean }) {
    if (event.isSelected) {
      this.selectedMethods.push(event.value);
    } else {
      this.selectedMethods = this.selectedMethods.filter(
        (m) => m !== event.value
      );
    }
  }

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
}
