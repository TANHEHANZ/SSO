import { Component, ElementRef, OnInit } from '@angular/core';
import { FileIcon } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/ui/button';
import { GoogleIconComponent } from '../../../shared/ui/icons';
import { TitleLoginComponent } from './components/title';
import { BackgroundPathsComponent } from '../../../shared/backgraund';
import gsap from 'gsap';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    GoogleIconComponent,
    TitleLoginComponent,
    BackgroundPathsComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <main class="w-full h-screen overflow-hidden grid grid-cols-[600px_1fr]">
      <section class="flex justify-center items-center flex-col flex-1 p-8 ">
        <title-login />
        <form action="" class="mx-auto w-[70%]">
          <app-button
            [type]="'submit'"
            [variant]="'olther'"
            class="w-full"
            (onClick)="onSubmit()"
          >
            <app-google-icon [size]="24" />
            Iniciar secíon con google
          </app-button>
          <div
            class="w-full relative flex justify-center items-center h-[0.4px] bg-gray-400 my-4"
          >
            <p class="absolute bg-white px-2 text-xs">O</p>
          </div>
          <app-button
            [type]="'submit'"
            [variant]="'olther'"
            class="w-full"
            (onClick)="onSubmit()"
          >
            Continuar con Email y password
          </app-button>
          <div
            class="w-full relative flex justify-center items-center h-[0.4px] bg-gray-400 my-4"
          >
            <p class="absolute bg-white px-2 text-xs">O</p>
          </div>
          <app-button
            [type]="'submit'"
            [variant]="'olther'"
            class="w-full"
            (onClick)="onSubmit()"
          >
            Continuar con ci y password
          </app-button>
        </form>
      </section>
      <article class="relative  bg-slate-900">
        <h2 class="font-bold 4xl text-white ">
          <!-- Acceda a servicios de GAMC con una sola cuenta -->
        </h2>
        <div class=" transform w-full h-full relative">
          <div class="absolute inset-0">
            <background-paths />
          </div>
        </div>
      </article>
    </main>
  `,
  standalone: true,
})
export class LoginComponent implements OnInit {
  readonly FileIcon = FileIcon;
  private timeLine: gsap.core.Timeline;
  constructor(private element: ElementRef) {
    this.timeLine = gsap.timeline();
  }

  onSubmit() {}
  ngOnInit(): void {
    const form = this.element.nativeElement.querySelector('form');
    this.timeLine.from(form, {
      opacity: 0,
      y: 80,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
