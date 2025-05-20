import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="flex flex-col h-full min-h-72 ">
      <div class="flex-grow relative overflow-hidden p-4  ">
        <header class="mb-4">
          <h2 class="text-2xl font-medium">Configuración de {{ title }}</h2>
          <p class="text-sm text-gray-500">
            {{ description }}
          </p>
        </header>
        <div
          class="transition-all duration-500 ease-in-out"
          [class.translate-x-0]="!isAnimating"
          [class.opacity-100]="!isAnimating"
          [class.translate-x-full]="isAnimating && isNext"
          [class.-translate-x-full]="isAnimating && !isNext"
          [class.opacity-0]="isAnimating"
        >
          <ng-container *ngTemplateOutlet="steps[currentStep]"></ng-container>
        </div>
      </div>

      <div class="flex justify-between mt-4 gap-4 items-center">
        @if (currentStep > 0) {
        <app-button (click)="onPrevious()" [disabled]="isPreviousDisable">
          Anterior
        </app-button>
        } @else {
        <div></div>
        }

        <app-button
          (click)="onNext()"
          class="self-end max-w-64"
          [disabled]="isNextDisabled"
        >
          {{ isLastStep ? 'Terminar' : 'Siguiente' }}
        </app-button>
      </div>
    </div>
  `,
})
export class StepperComponent {
  @Input() totalSteps = 1;
  @Input() isPreviousDisable = false;
  @Input() isNextDisabled = false;
  @Input() title = '';
  @Input() description = '';
  @ContentChildren(TemplateRef) stepTemplates!: QueryList<TemplateRef<any>>;
  @Output() stepChange = new EventEmitter<number>();

  currentStep = 0;
  steps: TemplateRef<any>[] = [];
  isAnimating = false;
  isNext = true;

  get isLastStep(): boolean {
    return this.currentStep === this.totalSteps - 1;
  }

  ngAfterContentInit() {
    this.steps = this.stepTemplates.toArray();
  }

  onNext() {
    if (this.currentStep < this.totalSteps - 1) {
      this.isNext = true;
      this.animateStep(() => {
        this.currentStep++;
        this.stepChange.emit(this.currentStep);
      });
    }
  }

  onPrevious() {
    if (this.currentStep > 0) {
      this.isNext = false;
      this.animateStep(() => {
        this.currentStep--;
        this.stepChange.emit(this.currentStep);
      });
    }
  }

  private animateStep(callback: () => void) {
    this.isAnimating = true;
    setTimeout(() => {
      callback();
      this.isAnimating = false;
    }, 300);
  }
}
