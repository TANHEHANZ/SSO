import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'background-paths',
  imports: [CommonModule],
  styles: `
   :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      color: #7B00F7;
    }
  `,
  template: `
    <svg
      class="w-[70dvw] h-full absolute inset-0 pointer-events-none z-0"
      viewBox="0 0 696 316"
      fill="none"
    >
      <ng-container *ngFor="let path of paths">
        <path
          [attr.d]="path.d"
          stroke="currentColor"
          [attr.stroke-width]="path.width"
          [attr.stroke-opacity]="0.1 + path.id * 0.03"
        />
      </ng-container>
    </svg>
  `,
})
export class BackgroundPathsComponent implements OnInit {
  @Input() position: number = 1;
  paths: { id: number; d: string; color: string; width: number }[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.paths = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${480 - i * 5 * this.position} -${289 + i * 6}C-${
        480 - i * 5 * this.position
      } -${289 + i * 6} -${412 - i * 5 * this.position} ${316 - i * 6} ${
        252 - i * 5 * this.position
      } ${443 - i * 6}C${816 - i * 5 * this.position} ${670 - i * 6} ${
        884 - i * 5 * this.position
      } ${1075 - i * 6} ${884 - i * 5 * this.position} ${1075 - i * 6}`,
      color: `#fff`,
      width: 0.5 + i * 0.03,
    }));

    requestAnimationFrame(() => {
      this.animatePaths();
    });
  }
  animatePaths(): void {
    const paths = this.el.nativeElement.querySelectorAll('path');
    paths.forEach((path: SVGPathElement, index: number) => {
      gsap.fromTo(
        path,
        {
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 0.8,
          repeat: -1,
          duration: 3 + index * 0.2,
          ease: 'power1.inOut',
          yoyo: true,
          delay: index * 0.05,
        }
      );
    });
  }
}
