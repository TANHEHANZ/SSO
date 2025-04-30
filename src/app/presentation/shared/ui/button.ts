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
      [ngStyle]="{
        '&:hover': {
          'background-color':
            variant === 'primary' ? color + 'cc' : color + '1a'
        }
      }"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      button:hover {
        background-color: var(--button-color) + '1a';
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

  protected baseClasses = `
    font-medium transition-colors duration-200
    focus:ring-4 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    flex flex-row 
    items-center justify-center gap-2 px-[32px] py-[14px] rounded-xl
    border
  `;
}
