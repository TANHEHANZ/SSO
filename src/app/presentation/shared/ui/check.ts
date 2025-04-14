import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="flex"
      [class.flex-col]="labelPosition === 'top'"
      [class.items-center]="
        labelPosition === 'right' || labelPosition === 'left'
      "
      [class.flex-row-reverse]="labelPosition === 'left'"
      [class.gap-2]="true"
    >
      <label [for]="id" class="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          [id]="id"
          class="sr-only peer"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onInputChange($event)"
        />
        <div
          class="w-5 h-5 border-2 rounded-md peer-focus:ring-2 peer-focus:ring-primary-theme_orage/20 transition-all duration-200
            peer-checked:bg-primary-theme_orage peer-checked:border-primary-theme_orage
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            border-gray-300 bg-white"
        >
          <svg
            class="w-3 h-3 mx-auto mt-0.5 text-white"
            [class.hidden]="!checked"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </label>
      <label
        [for]="id"
        class="text-sm text-gray-700 cursor-pointer select-none"
        [class.text-gray-400]="disabled"
      >
        <ng-content></ng-content>
      </label>
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() labelPosition: 'left' | 'right' | 'top' = 'right';
  @Input() disabled = false;

  checked = false;
  onChange = (value: boolean) => {};
  onTouched = () => {};

  onInputChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.checked = checkbox.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
