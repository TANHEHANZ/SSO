import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconMapping,
  iconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <section class="relative">
      @if (description) {
      <div
        class="  absolute right-2 top-2 group z-30 "
        [class.right-10]="isSelected"
      >
        <fa-icon
          [icon]="getIcon('InfoCircle')"
          class="text-gray-400 hover:text-primary-theme_orage cursor-help"
        />
        <div
          class=" invisible group-hover:visible absolute z-50 w-64 p-4 text-sm bg-white border border-primary-theme_orage text-primary-theme_orage-light rounded-lg shadow-lg -right-10"
        >
          {{ description }}
        </div>
      </div>

      }
      <div
        class="border rounded-lg p-4 cursor-pointer transition-all relative overflow-hidden"
        [class.border-primary-theme_purple]="isSelected"
        [class.hover:border-primary-theme_purple]="!isSelected"
        (click)="onCardClick($event)"
      >
        <div
          class="absolute inset-0 w-full h-full select-circle"
          [class.active]="isSelected"
          [style.left.px]="clickX"
          [style.top.px]="clickY"
        ></div>

        <div class="relative ">
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .select-circle {
        position: absolute;
        transform: scale(0);
        transition: transform 0.5s ease-out;
        background: #482778;
        opacity: 0.1;
        border-radius: 50%;
        width: 15rem;
        height: 15rem;
        margin-left: -7.5rem;
        margin-top: -7.5rem;
        pointer-events: none;
      }

      .select-circle.active {
        transform: scale(3);
      }
    `,
  ],
})
export class CardComponent {
  @Input() value: any;
  @Input() isSelected: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() description?: string;
  @Output() selected = new EventEmitter<any>();

  clickX = 0;
  clickY = 0;

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  onCardClick(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.clickX = event.clientX - rect.left;
    this.clickY = event.clientY - rect.top;

    this.isSelected = this.multiSelect ? !this.isSelected : true;
    this.selected.emit({
      value: this.value,
      isSelected: this.isSelected,
    });
  }
}
