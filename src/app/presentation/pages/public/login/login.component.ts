import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FileIcon } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/ui/button';
import { GoogleIconComponent } from '../../../shared/ui/icons';
import { TitleLoginComponent } from './components/title';
import { BackgroundPathsComponent } from '../../../shared/backgraund';
import gsap from 'gsap';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bento3Component, Bento4Component } from './components/bento';
import { CargaComponent } from './components/carga';
import { Bento6Component } from './components/bento/6';
import { environment } from '../../../../infraestructure/config/config';
import { AuthService } from '@app/infraestructure/services/auth';
@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    GoogleIconComponent,
    TitleLoginComponent,
    BackgroundPathsComponent,
    ReactiveFormsModule,
    CommonModule,
    Bento3Component,
    Bento4Component,
    Bento6Component,
  ],
  template: `
    <!-- <carga-inicial /> -->
    <main class="w-full h-screen overflow-hidden grid grid-cols-[500px_1fr]">
      <section
        class="flex justify-center items-center flex-col flex-1 p-8 relative"
      >
        <background-paths />

        <article
          class="w-full h-full flex justify-center items-center flex-col"
        >
          <title-login />
          <form
            (submit)="$event.preventDefault()"
            class="mx-auto w-[70%] flex flex-col justify-center items-center "
          >
            <app-button
              [type]="'submit'"
              [variant]="'terteary'"
              (onClick)="onSubmit('google')"
            >
              <app-google-icon [size]="24" />
              Iniciar secíon con google
            </app-button>
            <div
              class="w-1/2 mx-auto relative flex justify-center items-center h-[0.4px] bg-gray-400 my-3"
            >
              <p class="absolute bg-white px-2 text-xs">O</p>
            </div>
            <app-button
              [type]="'submit'"
              [variant]="'primary'"
              (onClick)="onSubmit('email')"
            >
              Continuar con Email y password
            </app-button>
            <div
              class="w-1/2 mx-auto relative flex justify-center items-center h-[0.4px] bg-gray-400 my-3"
            >
              <p class="absolute bg-white px-2 text-xs">O</p>
            </div>
            <app-button
              [type]="'submit'"
              [variant]="'secondary'"
              (onClick)="onSubmit('ci')"
            >
              Continuar con ci y password
            </app-button>
          </form>
        </article>
      </section>
      <article
        class="relative overflow-hidden h-[90dvh] my-auto  grid grid-cols-[1fr_1fr] gap-4 grid-rows-[200px_1fr_1fr_200px] mr-4 border-l-2 pl-4"
      >
        <bento-4 class=" row-span-2" />
        <bento-6 class="row-span-2 opacity-0" />
        <bento-6 class="row-span-2" />
        <!-- <bento-3 class="  row-span-4" /> -->
      </article>
    </main>
  `,
  standalone: true,
})
export class LoginComponent implements AfterViewInit {
  readonly FileIcon = FileIcon;

  private timeLine: gsap.core.Timeline;
  private authS = inject(AuthService);
  constructor(private element: ElementRef) {
    this.timeLine = gsap.timeline();
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

  onSubmit(type: string) {
    switch (type) {
      case 'google':
        this.authS.googleLogin().subscribe({
          next: (response) => {
            // Handle successful login
            console.log('Google login success:', response);
            // Redirect or handle token storage
          },
          error: (error) => {
            console.error('Google login failed:', error);
            // Handle error (show message, etc)
          },
        });
        break;
      case 'email':
        // Implement email login route
        break;
      case 'ci':
        // Implement CI login route
        break;
    }
  }
}
