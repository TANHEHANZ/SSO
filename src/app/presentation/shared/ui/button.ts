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
  
    font-medium rounded-lg transition-colors duration-200
    focus:ring-4 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    flex flex-row 
    items-center justify-center gap-2 px-6 py-5 w-full rounded-full
    `;
  protected variantClasses: Record<string, string> = {
    primary:
      'bg-primary-theme_orage dark:bg-primary-dark text-white hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 w-full',
    secondary:
      'bg-primary-theme_cian/10 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-primary-theme_cian/30 dark:hover:bg-gray-600 ',
    danger:
      'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
    tertiary:
      'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    olther:
      'bg-slate-900 text-white hover:bg-slate-800 dark:bg-black dark:hover:bg-slate-950 border border-slate-700',
  };
}
