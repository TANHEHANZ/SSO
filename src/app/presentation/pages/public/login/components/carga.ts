import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'carga-inicial',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #container
      class="fixed inset-0  z-50 flex justify-center items-center bg-primary-theme_purple "
    >
      <p
        #message1
        class="text-6xl gap-2 font-bold text-white relative flex justify-center items-center"
      >
        <span class="opacity-1 translate-y-full">¡</span>
        <span class="opacity-1 translate-y-full">B</span>
        <span class="opacity-1 translate-y-full">i</span>
        <span class="opacity-1 translate-y-full">e</span>
        <span class="opacity-1 translate-y-full">n</span>
        <span class="opacity-1 translate-y-full">v</span>
        <span class="opacity-1 translate-y-full">e</span>
        <span class="opacity-1 translate-y-full">n</span>
        <span class="opacity-1 translate-y-full">i</span>
        <span class="opacity-1 translate-y-full">d</span>
        <span class="opacity-1 translate-y-full">o</span>
        <span class="opacity-1 translate-y-full">!</span>
      </p>
    </div>
  `,
})
export class CargaComponent implements AfterViewInit {
  @ViewChild('message1') message1!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  private timeline: gsap.core.Timeline;
  constructor(private el: ElementRef) {
    this.timeline = gsap.timeline();
  }

  ngAfterViewInit(): void {
    const saludo = this.el.nativeElement.querySelectorAll('span');
    this.timeline
      .to(saludo[0], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[1], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[2], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[3], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[4], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[5], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[6], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[7], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[8], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[9], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[10], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(saludo[11], {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(this.container.nativeElement, {
        translateY: '-100%',
        duration: 0.8,
        ease: 'power2.out',
      });
  }
}
