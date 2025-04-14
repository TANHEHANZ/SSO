import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-1   rounded-lg w-full justify-around my-2">
      <button
        *ngFor="let tab of tabs"
        (click)="onTabClick(tab)"
        [disabled]="tab.disabled"
        [class]="
          'text-sm py-3 flex-1' +
          (selectedTab?.id === tab.id
            ? ' border-b-2  border-primary-theme_purple  '
            : '') +
          (tab.disabled ? 'bg-purple-600' : '')
        "
      >
        {{ tab.label }}
      </button>
    </div>
  `,
})
export class TabContainerComponent {
  @Input() tabs: Tab[] = [];
  @Input() selectedTab?: Tab;
  @Output() tabChange = new EventEmitter<Tab>();

  onTabClick(tab: Tab): void {
    if (!tab.disabled) {
      this.selectedTab = tab;
      this.tabChange.emit(tab);
    }
  }
}
