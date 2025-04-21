import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateService } from '@app/infraestructure/global/form-state.service';

import gsap from 'gsap';
import { InitialFormLogin } from './forms/initial.form';
import { credentialFormComponent } from './forms/credentials.compoent';
import { CiFormComponent } from './forms/ci.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'form-container',
  standalone: true,
  imports: [
    CommonModule,
    InitialFormLogin,
    credentialFormComponent,
    CiFormComponent,
    LucideAngularModule,
  ],
  template: `
    <div
      class=" w-full h-full flex  justify-center items-center relative"
      #formContainer
    >
      <button
        class=" absolute top-0 right-0 -translate-y-24 opacity-0 p-2 bg-violet-200 rounded-xl text-primary-theme_purple hover:bg-primary-theme_purple/70  transition-colors z-30 group"
        #backButton
        (click)="goBack()"
      >
        <i-lucide
          [img]="ChevronLeft"
          class="text-primary-theme_purple   group-hover:text-white transition-colors"
        ></i-lucide>
      </button>
      <div class="form-element  relative w-full " #initial>
        <inital-form-login />
      </div>
      <div class="form-element hidden opacity-0 w-[80%] mx-auto" #email>
        <credential-component />
      </div>

      <div class="form-element hidden opacity-0" #ci>
        <ci-component />
      </div>
    </div>
  `,
})
export class FormContainerComponent implements AfterViewInit {
  readonly ChevronLeft = ChevronLeft;
  private formState = inject(FormStateService);
  currentForm = toSignal(this.formState.currentForm$);
  private timeline = gsap.timeline();

  @ViewChild('initial', { static: false }) initialForm!: ElementRef;
  @ViewChild('email') emailForm!: ElementRef;
  @ViewChild('ci') ciForm!: ElementRef;
  @ViewChild('backButton') backButton!: ElementRef;

  showView() {}
  private handleFormTransition(from: ElementRef, to: ElementRef) {
    this.timeline.clear();
    return this.timeline
      .to(from.nativeElement, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        display: 'none',
      })
      .set(to.nativeElement, {
        display: 'block',
        opacity: 0,
      })
      .to(to.nativeElement, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
  }
  ngAfterViewInit(): void {
    let previousForm: 'email' | 'ci' = 'email';

    this.formState.currentForm$.subscribe((form) => {
      switch (form) {
        case 'email':
          this.handleFormTransition(this.initialForm, this.emailForm);
          previousForm = 'email';
          this.timeline.to(this.backButton.nativeElement, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
          break;
        case 'ci':
          this.handleFormTransition(this.initialForm, this.ciForm);
          previousForm = 'ci';
          this.timeline.to(this.backButton.nativeElement, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
          break;
        case 'initial':
          const formToTransition =
            previousForm === 'email' ? this.emailForm : this.ciForm;
          this.handleFormTransition(formToTransition, this.initialForm);
          this.timeline.to(this.backButton.nativeElement, {
            opacity: 0,
            y: -20,
            duration: 0.3,
          });
          break;
      }
    });
  }

  goBack() {
    this.formState.toggleFormExpansion(false, 'initial');
  }
}
