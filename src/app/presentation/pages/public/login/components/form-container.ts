import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateService } from '@app/infraestructure/global/form-state.service';

import gsap from 'gsap';
import { InitialFormLogin } from './forms/initial.form';
import { credentialFormComponent } from './forms/credentials.compoent';
import { CiFormComponent } from './forms/ci.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'form-container',
  standalone: true,
  imports: [
    CommonModule,
    InitialFormLogin,
    credentialFormComponent,
    CiFormComponent,
  ],
  template: `
    <div class="relative w-full flex-1" #formContainer>
      @if (showInitial()) {
      <div class="form-element w-full" #initial [class.hidden]="!showInitial()">
        <inital-form-login />
      </div>
      } @if (showEmail()) {
      <div class="form-element w-full" #email [class.hidden]="!showEmail()">
        <credential-component />
      </div>
      } @if (showCi()) {
      <div class="form-element w-full" #ci [class.hidden]="!showCi()">
        <ci-component />
      </div>
      }
    </div>
  `,
})
export class FormContainerComponent {
  private formState = inject(FormStateService);
  currentForm = toSignal(this.formState.currentForm$);

  // Señales para controlar la visibilidad de cada formulario
  showInitial = signal(true);
  showEmail = signal(false);
  showCi = signal(false);

  // Referencias a los formularios
  @ViewChild('initial') initialForm!: ElementRef;
  @ViewChild('email') emailForm!: ElementRef;
  @ViewChild('ci') ciForm!: ElementRef;

  private previousForm: string | any = 'initial';
  private timeline = gsap.timeline();

  constructor() {
    effect(() => {
      const current = this.currentForm();
      if (current !== this.previousForm) {
        this.handleFormTransition(this.previousForm, current);
        this.previousForm = current;
      }
    });
  }

  private handleFormTransition(previous: string | null, current: string | any) {
    if (!previous || !current) return;

    // Ocultar el formulario anterior
    const previousFormElement = this.getFormElement(previous);
    if (previousFormElement) {
      this.timeline.to(previousFormElement, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => this.hideForm(previous),
      });
    }

    // Mostrar y animar el nuevo formulario
    this.showForm(current);
    const currentFormElement = this.getFormElement(current);
    if (currentFormElement) {
      // Usamos setTimeout para asegurarnos de que el elemento está en el DOM
      setTimeout(() => {
        this.timeline.fromTo(
          currentFormElement,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.3 // Overlap con la animación de salida
        );
      }, 0);
    }
  }

  private getFormElement(formType: string | null): HTMLElement | null {
    switch (formType) {
      case 'initial':
        return this.initialForm?.nativeElement || null;
      case 'email':
        return this.emailForm?.nativeElement || null;
      case 'ci':
        return this.ciForm?.nativeElement || null;
      default:
        return null;
    }
  }

  private showForm(formType: string | null) {
    switch (formType) {
      case 'initial':
        this.showInitial.set(true);
        break;
      case 'email':
        this.showEmail.set(true);
        break;
      case 'ci':
        this.showCi.set(true);
        break;
    }
  }

  private hideForm(formType: string | null) {
    switch (formType) {
      case 'initial':
        this.showInitial.set(false);
        break;
      case 'email':
        this.showEmail.set(false);
        break;
      case 'ci':
        this.showCi.set(false);
        break;
    }
  }
}
