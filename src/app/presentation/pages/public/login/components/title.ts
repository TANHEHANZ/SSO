import { Component, ElementRef, OnInit } from '@angular/core';
import gsap from 'gsap';
@Component({
  selector: 'title-login',
  imports: [],
  template: `
    <section
      class="my-2 flex flex-col justify-center items-center dark:text-white"
    >
      <div class="flex text-4xl gap-2 font-normal text-center ">
        <p id="1" class="font-medium text-gray-700">Bienvenido</p>
      </div>
      <div class="flex text-gray-500 font-light text-sm mt-2 dark:text-white">
        <p id="2">Elige tu método preferido para iniciar sesión</p>
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
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );
  }
}
