import { Component, ElementRef, OnInit } from '@angular/core';
import { Key, LucideAngularModule, Shield, Smile } from 'lucide-angular';
import gsap from 'gsap';

@Component({
  selector: 'bento-6',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <section class="rounded-2xl grid grid-cols-3 gap-2 w-full h-1/2 ">
      <div
        class="bg-primary-theme_purple dark:bg-primary-theme_purple/60 text-white rounded-xl w-full h-full p-4 flex flex-col"
      >
        <p
          class="text-[10px] self-end bg-white px-2 py-1 text-primary-theme_purple rounded-md"
        >
          Importante
        </p>
        <div class="flex items-center gap-2 my-2">
          <lucide-angular [img]="key" class="my-icon"></lucide-angular>
          <h3 class="font-bold text-xl">Acceso</h3>
        </div>
        <p class="text-sm">Una sola cuenta para todos los servicios de GAMC</p>
      </div>
      <div
        class="border border-primary-theme_purple rounded-xl w-full h-full p-4 flex flex-col dark:text-primary-theme_purple"
      >
        <p
          class="text-[10px] self-end bg-white px-2 py-1 text-primary-theme_purple rounded-md"
        >
          Importante
        </p>
        <div class="flex items-center gap-2 my-2">
          <lucide-angular [img]="shield" class="w-6 h-6"></lucide-angular>
          <h3 class="font-bold text-xl">Seguridad</h3>
        </div>
        <p class="text-sm">
          Autenticación robusta y gestión centralizada de accesos
        </p>
      </div>
      <div
        class="bg-indigo-300/20 rounded-xl w-full h-full p-4 flex flex-col dark:text-white"
      >
        <p
          class="text-[10px] self-end bg-white px-2 py-1 text-primary-theme_purple rounded-md"
        >
          Importante
        </p>
        <div class="flex items-center gap-2 my-2">
          <lucide-angular [img]="smile" class="w-6 h-6"></lucide-angular>
          <h3 class="font-bold text-xl">Experiencia</h3>
        </div>
        <p class="text-sm">Sin necesidad de múltiples inicios de sesión</p>
      </div>
    </section>
  `,
})
export class Bento6Component implements OnInit {
  readonly key = Key;
  readonly shield = Shield;
  readonly smile = Smile;
  private timeLine: gsap.core.Timeline;
  constructor(private el: ElementRef) {
    this.timeLine = gsap.timeline();
  }

  ngOnInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('div');
    this.timeLine.from(elements, {
      opacity: 0,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }
}
