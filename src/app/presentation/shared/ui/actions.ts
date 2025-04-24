import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Key, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';

@Component({
  selector: 'actions-cell',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="flex gap-2 justify-center">
      <button class="p-1 hover:bg-gray-100 rounded-full" (click)="onEdit()">
        <i-lucide [img]="Pencil" class="w-5 h-5 text-blue-500"></i-lucide>
      </button>
      <button class="p-1 hover:bg-gray-100 rounded-full" (click)="onResetKey()">
        <i-lucide [img]="Key" class="w-5 h-5 text-amber-500"></i-lucide>
      </button>
      <button class="p-1 hover:bg-gray-100 rounded-full" (click)="onDelete()">
        <i-lucide [img]="Trash2" class="w-5 h-5 text-red-500"></i-lucide>
      </button>
    </div>
  `,
})
export class ActionsCellRenderer implements ICellRendererAngularComp {
  readonly Pencil = Pencil;
  readonly Key = Key;
  readonly Trash2 = Trash2;

  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onEdit(this.params.data);
  }

  onResetKey() {
    this.params.context.componentParent.onResetKey(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.onDelete(this.params.data);
  }
}
