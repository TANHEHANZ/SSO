import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BackgroundPathsComponent } from '../../../shared/backgraund';
import gsap from 'gsap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { QueryParams } from './components/bento/1';
import { InformationComponent } from './components/information';
import { ButtonChangeTheme } from '../../../shared/ui/button.theme';
import { RouteParamsService } from '@app/infraestructure/global/route-params.service';
import { FormStateService } from '@app/infraestructure/global/form-state.service';
import { FormContainerComponent } from './components/form-container';
import { TitleLoginComponent } from './components/title';
import { ButtonComponent } from '../../../shared/ui/button';
import { GoogleIconComponent } from '../../../shared/ui/icons/google';

@Component({
  selector: 'app-login',
  imports: [
    BackgroundPathsComponent,
    ReactiveFormsModule,
    CommonModule,
    ToastComponent,
    LucideAngularModule,
    InformationComponent,
    ButtonChangeTheme,
    FormContainerComponent,
    TitleLoginComponent,
    ButtonComponent,
    GoogleIconComponent,
  ],
  template: `
    <change-theme />
    <main
      class="w-full h-screen overflow-hidden flex relative bg-[#F3F5F9] justify-center items-center"
    >
      <app-toast></app-toast>
      <form
        class="bg-white w-[30%] h-[70%] border-2 border-white relative rounded-3xl overflow-hidden"
      >
        <div class="background-pathern h-[35%] absolute w-full p-4">
          <img
            src="./assets/images/logo cochabamba.png"
            alt="Logo"
            class="w-[60%] object-cover mx-auto"
          />
          <title-login />
          <app-button [type]="'submit'">
            <app-google-icon [size]="24" />
          </app-button>
        </div>
      </form>

      <!-- <form-container class="w-full h-full flex justify-center items-center " /> -->
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
    this.timeLine.clear();
    this.timeLine.to(this.mainElement.nativeElement.querySelector('section'), {
      width: '700px',
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  collapseGrid() {
    this.timeLine.clear();
    this.timeLine.to(this.mainElement.nativeElement.querySelector('section'), {
      width: '500px',
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
