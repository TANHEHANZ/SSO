import {
  AfterViewInit,
  Component,
  ElementRef,
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
import {
  Bento1Component,
  Bento2Component,
  Bento3Component,
  Bento4Component,
  Bento5Component,
} from './components/bento';
import { CargaComponent } from './components/carga';
@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    GoogleIconComponent,
    TitleLoginComponent,
    BackgroundPathsComponent,
    ReactiveFormsModule,
    CommonModule,
    Bento1Component,
    Bento2Component,
    Bento3Component,
    Bento4Component,
    Bento5Component,
    CargaComponent,
  ],
  template: `
    <carga-inicial />
    <main class="w-full h-screen overflow-hidden grid grid-cols-[600px_1fr]">
      <section
        class="flex justify-center items-center flex-col flex-1 p-8 relative"
      >
        <background-paths />

        <article
          class="w-full h-full flex justify-center items-center flex-col"
        >
          <title-login />
          <form
            action=""
            class="mx-auto w-[70%] flex flex-col justify-center items-center "
          >
            <app-button
              [type]="'submit'"
              [variant]="'terteary'"
              (onClick)="onSubmit()"
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
              (onClick)="onSubmit()"
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
              (onClick)="onSubmit()"
            >
              Continuar con ci y password
            </app-button>
          </form>
        </article>
      </section>
      <article
        class="relative overflow-hidden h-[90dvh] my-auto rounded-l-xl grid grid-cols-[150px_1fr_1fr_150px] gap-2 grid-rows-[200px_1fr_1fr_200px]"
      >
        <bento-1 />
        <bento-2 />
        <bento-3 class="col-span-2  row-span-3" />
        <bento-4 class="col-span-2 row-span-2" />

        <bento-5 class="col-span-4" />
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
  ngOnInit(): void {}
}
