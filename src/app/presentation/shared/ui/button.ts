import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [class]="baseClasses + ' ' + variantClasses[variant]"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'terteary' | 'olther' =
    'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  protected baseClasses = `
    font-medium  transition-colors duration-200
    focus:ring-4 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    flex flex-row 
    items-center justify-center gap-2 px-[32px] py-[16px]  rounded-full
    `;
  protected variantClasses: Record<string, string> = {
    primary:
      'bg-primary-theme_purple text-white hover:bg-primary-theme_purple/90 dark:hover:bg-primary-theme_purple/80 dark:bg-primary-theme_purple/60 w-full',
    secondary:
      'bg-transparent text-primary-theme_purple hover:bg-indigo-300/20 border border-primary-theme_purple',
    danger:
      'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
    terteary:
      'bg-indigo-300/20 text-primary-theme_purple hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    olther:
      'bg-primary-theme_purple/10 text-white hover:bg-slate-800 border border-primary-theme_purple/30',
  };
}
