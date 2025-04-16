import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TitleLoginComponent } from './components/title';
import { BackgroundPathsComponent } from '../../../shared/backgraund';
import gsap from 'gsap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { QueryParams } from './components/bento/1';
import { InformationComponent } from './components/information';
import { ButtonChangeTheme } from '../../../shared/ui/button.theme';
import { InitialFormLogin } from './components/forms/initial.form';
import { RouteParamsService } from '@app/infraestructure/global/route-params.service';
import { FormStateService } from '@app/infraestructure/global/form-state.service';
import { FormContainerComponent } from './components/form-container';

@Component({
  selector: 'app-login',
  imports: [
    TitleLoginComponent,
    BackgroundPathsComponent,
    ReactiveFormsModule,
    CommonModule,
    ToastComponent,
    LucideAngularModule,
    InformationComponent,
    ButtonChangeTheme,
    InitialFormLogin,
    FormContainerComponent,
  ],
  template: `
    <change-theme />
    <main class="w-full h-screen overflow-hidden flex relative" #collapsed>
      <app-toast></app-toast>
      <section
        class="flex-shrink-0 transition-all duration-500 ease-out"
        [style.width]="'500px'"
        #loginSection
      >
        <div class="flex justify-center items-center flex-col h-full p-8">
          <background-paths />

          <form-container class="w-full">
            <ng-template #initialForm>
              <title-login />
              <inital-form-login class="w-full" />
            </ng-template>

            <ng-template #emailForm>
              <div class="w-full">
                <h2>Email Login Form</h2>
                <!-- Email form content -->
              </div>
            </ng-template>

            <ng-template #ciForm>
              <div class="w-full">
                <h2>CI Login Form</h2>
                <!-- CI form content -->
              </div>
            </ng-template>
          </form-container>

          <!-- 
          <div #initialForm class="w-full">
            <title-login />
            <inital-form-login class="w-full" />
          </div> -->
          <!-- aca podria venir iniciar secion con ci o credenciales  -->
          <!-- tambien podra venir la creacion de la cuenta , pero el usuairo -->
        </div>
      </section>
      <information-login [params]="params" class="flex-1" />
    </main>
  `,
  standalone: true,
})
export class LoginComponent implements AfterViewInit, OnInit {
  toastS = inject(ToastService);
  routeParams = inject(RouteParamsService);
  formState = inject(FormStateService);
  private element = inject(ElementRef);
  private timeLine = gsap.timeline();

  @ViewChild('collapsed') mainElement!: ElementRef;
  @ViewChild('initialForm') initialForm!: ElementRef;

  params: QueryParams = this.routeParams.getParams();

  ngOnInit(): void {
    this.routeParams.params$.subscribe((params) => {
      this.params = params;
    });
    this.formState.expandedForm$.subscribe((expanded) => {
      console.log(expanded);
      if (!expanded) {
        return this.collapseGrid();
      }
      this.expandGrid();
    });
  }

  ngAfterViewInit(): void {
    const bentos = this.element.nativeElement.querySelectorAll('article > *');
    this.timeLine.from(bentos, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    });
  }
  expandGrid() {
    console.log(this.initialForm);
    this.timeLine.clear();
    this.timeLine
      .to(this.mainElement.nativeElement.querySelector('section'), {
        width: '700px',
        duration: 0.5,
        ease: 'power2.out',
      })
      .to(
        this.initialForm.nativeElement, // Changed: remove querySelector
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
          onComplete: () => {
            this.initialForm.nativeElement.style.visibility = 'hidden';
            this.initialForm.nativeElement.style.pointerEvents = 'none';
          },
        },
        '<'
      )
      .to(this.initialForm.nativeElement, {});
  }

  collapseGrid() {
    this.timeLine.clear();
    this.timeLine
      .to(this.mainElement.nativeElement.querySelector('section'), {
        width: '500px',
        duration: 0.5,
        ease: 'power2.out',
      })
      .set(this.initialForm.nativeElement, {
        visibility: 'visible',
        pointerEvents: 'auto',
      })
      .to(
        this.initialForm.nativeElement,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        },
        '<'
      );
  }
}
