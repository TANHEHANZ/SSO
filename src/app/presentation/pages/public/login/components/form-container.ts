import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
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
    <div
      class="relative w-full flex-1 flex  justify-center items-center"
      #formContainer
    >
      <div class="form-element w-full relative h-full " #initial>
        <inital-form-login />
      </div>
      <div class="form-element hidden opacity-0" #email>
        <credential-component />
      </div>

      <div class="form-element hidden opacity-0" #ci>
        <ci-component />
      </div>
    </div>
  `,
})
export class FormContainerComponent implements AfterViewInit {
  private formState = inject(FormStateService);
  currentForm = toSignal(this.formState.currentForm$);

  @ViewChild('initial', { static: false }) initialForm!: ElementRef;
  @ViewChild('email') emailForm!: ElementRef;
  @ViewChild('ci') ciForm!: ElementRef;

  showView() {}
  ngAfterViewInit(): void {
    this.formState.currentForm$.subscribe((form) => {
      console.log(form);
      console.log(this.initialForm.nativeElement);
      switch (form) {
        case 'email':
          this.timeline
            .to(this.initialForm.nativeElement, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                this.initialForm.nativeElement.classList.add('hidden');
              },
            })
            .set(this.emailForm.nativeElement, {
              display: 'block',
              opacity: 1,
              y: 20,
            });

          break;
      }
    });
  }
  private timeline = gsap.timeline();
}
