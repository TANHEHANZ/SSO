import { Component, ElementRef, OnInit } from '@angular/core';
import gsap from 'gsap';
@Component({
  selector: 'title-login',
  imports: [],
  template: `
    <section class=" my-4 flex flex-col justify-center items-center">
      <div class="flex text-4xl gap-2 font-normal text-center">
        <p id="1">Iniciar</p>
        <p id="2">Sesión</p>
      </div>
      <div class=" flex text-gray-500 font-light text-sm">
        <p id="3">Acceda a servicios de GAMC con una sola cuenta</p>
        <p id="4"></p>
      </div>
    </section>
  `,
})
export class TitleLoginComponent implements OnInit {
  private timeLine: gsap.core.Timeline;
  constructor(private el: ElementRef) {
    this.timeLine = gsap.timeline();
  }
  ngOnInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('p');
    this.timeLine.from(elements[0], {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power2.out',
    });
    this.timeLine.from(
      elements[1],
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    this.timeLine.from(
      elements[2],
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
  }
}
