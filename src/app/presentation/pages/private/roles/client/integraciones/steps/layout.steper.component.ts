import { Component } from '@angular/core';

import { ClientServiceStepComponent } from './servicios/step.service.component';
import { ClientConfigStepComponent } from './configuracion/step.config.component';
import { ClientTokenStepComponent } from './tokens/step.tokens.component';

@Component({
  selector: 'app-layout-steper',
  template: `
    <article class="h-full w-full">
      <nav class="my-4 ">
        <ul class="flex items-start justify-start   gap-2">
          @for (step of steps; track step.id) {
          <li
            class="flex flex-col items-center gap-2 min-w-44 cursor-pointer relative"
            (click)="setCurrentStep(step.id)"
          >
            <span
              class="text-sm whitespace-break-spaces duration-200"
              [class]="
                currentStep === step.id
                  ? 'text-primary-theme_purple'
                  : 'text-gray-400'
              "
            >
              {{ step.name }}
            </span>
            <div
              class="w-full absolute -bottom-2 transition-all duration-300"
              [class]="
                currentStep === step.id
                  ? 'h-2 bg-primary-theme_purple '
                  : 'h-1 bg-gray-200'
              "
            ></div>
          </li>
          }
        </ul>
      </nav>

      <section class="mt-6">
        @switch (currentStep) { @case ('1') {
        <app-services-step />
        } @case ('2') {
        <app-config-step />
        } @case ('3') {
        <app-tokens-step />
        } }
      </section>
    </article>
  `,
  imports: [
    ClientServiceStepComponent,
    ClientConfigStepComponent,
    ClientTokenStepComponent,
  ],
})
export class LayoutSteperComponent {
  steps = [
    {
      id: '1',
      name: 'Servicios',
      completed: false,
    },
    {
      id: '2',
      name: 'Configuración',
      completed: false,
    },
    {
      id: '3',
      name: 'Tokens',
      completed: false,
    },
  ];

  currentStep = '1';

  setCurrentStep(stepId: string) {
    this.currentStep = stepId;
  }
}
