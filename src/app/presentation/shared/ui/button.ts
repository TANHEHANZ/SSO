import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [class]="baseClasses"
      [disabled]="disabled"
      [style.--button-color]="color"
      [style.backgroundColor]="variant === 'primary' ? color : 'transparent'"
      [style.color]="variant === 'primary' ? 'white' : color"
      [style.borderColor]="variant === 'secondary' ? color : 'transparent'"
      (click)="onClick.emit($event)"
      (mousemove)="handleMouseMove($event)"
      (mouseenter)="isHovered = true"
      (mouseleave)="isHovered = false"
    >
      <div
        class="absolute inset-0 w-full h-full hover-circle"
        [style.left.px]="mouseX"
        [style.top.px]="mouseY"
      ></div>
      <div
        class="relative z-10 transition-colors duration-300"
        [style.color]="isHovered && variant === 'primary' ? color : ''"
      >
        <ng-content></ng-content>
      </div>
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
      .hover-content:hover {
        color: var(--button-color) !important;
      }
      .hover-circle {
        position: absolute;
        transform: scale(0);
        transition: transform 0.8s ease-out;
        background: white;
        border-radius: 50%;
        width: 15rem;
        height: 15rem;
        margin-left: -50px;
        margin-top: -50px;
        pointer-events: none;
      }

      button:hover .hover-circle {
        transform: scale(3);
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() color: string = '#482778';
  @Output() onClick = new EventEmitter<MouseEvent>();
  mouseX = 0;
  mouseY = 0;
  isHovered = false;
  handleMouseMove(event: MouseEvent) {
    this.isHovered = true;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }
  protected baseClasses = `
    font-medium transition-colors duration-200
    focus:ring-4 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    flex flex-row 
    items-center justify-center gap-2 px-[32px] py-[7px] rounded-xl
    border w-full
    relative overflow-hidden
  `;
}
