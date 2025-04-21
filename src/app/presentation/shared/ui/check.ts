import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Square, SquareCheck } from 'lucide-angular';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-start gap-2">
      <div class="flex items-center h-5">
        <input
          type="checkbox"
          [id]="id"
          [checked]="value"
          [disabled]="disabled"
          (change)="handleChange($event)"
          (blur)="onTouchedValue()"
          class="sr-only"
        />
        <div
          (click)="handleChange($event)"
          class="w-5 h-5 flex items-center justify-center transition-all duration-200
          focus:ring-2 focus:ring-primary-theme_orage/20
          disabled:opacity-50 disabled:cursor-not-allowed
          dark:text-gray-200
          cursor-pointer"
          [class.border-red-500]="error"
          [class.dark:border-red-500]="error"
        >
          <i-lucide
            [img]="value ? SquareCheck : Square"
            class="w-5 h-5"
            [class.text-primary-theme_orage]="value"
          ></i-lucide>
        </div>
      </div>
      <label
        [for]="id"
        class="text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none"
        [class.opacity-50]="disabled"
      >
        <ng-content></ng-content>
      </label>
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() error = false;
  @Input() disabled = false;
  readonly Square = Square;
  readonly SquareCheck = SquareCheck;

  value = false;
  protected onChangeValue: (value: boolean) => void = () => {};
  protected onTouchedValue: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedValue = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(event: Event): void {
    this.value = !this.value;
    this.onChangeValue(this.value);
    this.onTouchedValue();
  }
}
