import { Component, ContentChild, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateService } from '@app/infraestructure/global/form-state.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'form-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full">
      @switch (currentForm()) { @case ('initial') {
      <ng-container *ngTemplateOutlet="initialTpl"></ng-container>
      } @case ('email') {
      <ng-container *ngTemplateOutlet="emailTpl"></ng-container>
      } @case ('ci') {
      <ng-container *ngTemplateOutlet="ciTpl"></ng-container>
      } }
    </div>
  `,
})
export class FormContainerComponent {
  private formState = inject(FormStateService);
  currentForm = toSignal(this.formState.currentForm$);

  @ContentChild('initialForm') initialTpl!: TemplateRef<any>;
  @ContentChild('emailForm') emailTpl!: TemplateRef<any>;
  @ContentChild('ciForm') ciTpl!: TemplateRef<any>;
}
