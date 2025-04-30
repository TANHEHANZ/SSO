import { Component, Input, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/angular-table';
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="overflow-x-auto min-h-[65dvh] flex flex-col justify-between">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            @for (header of table().getHeaderGroups()[0].headers; track
            header.id) { @if (!header.isPlaceholder) {
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header.column.columnDef.header }}
            </th>
            } }
            <th class="w-10"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          @for (row of table().getRowModel().rows; track row.id) {
          <tr
            class="transition-colors duration-200"
            [style.backgroundColor]="getRowBackground(row.original)"
            (mouseenter)="onRowHover(row.original)"
            (mouseleave)="onRowLeave()"
          >
            @for (cell of row.getVisibleCells(); track cell.id) {
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              {{ cell.getValue() }}
            </td>
            }
            <td class="relative px-6 py-4 text-right">
              <div class="relative">
                <button
                  class="p-1 hover:bg-gray-100 rounded-full"
                  (click)="toggleActions(row.original)"
                >
                  <i-lucide
                    [img]="MoreVertical"
                    class="w-5 h-5 text-gray-500"
                  ></i-lucide>
                </button>

                @if (activeRow() === row.original) {
                <div
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                >
                  <div class="py-1">
                    <button
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      (click)="onEdit.emit([row.original])"
                    >
                      Editar
                    </button>
                    <button
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      (click)="onView.emit(row.original)"
                    >
                      Ver detalles
                    </button>
                    <button
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      (click)="onDelete.emit([row.original])"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                }
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
      <div
        class="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700"
      >
        <div class="text-sm text-gray-500">Total {{ totalRows }} registros</div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Registros por página</span>
            <select
              class="form-select rounded-md border-gray-300 text-sm"
              [value]="table().getState().pagination.pageSize"
              (change)="onPageSizeChange($event)"
            >
              <option [value]="5">5</option>
              <option [value]="10">10</option>
              <option [value]="15">15</option>
              <option [value]="20">20</option>
            </select>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500">
              {{ currentRange.start }}-{{ currentRange.end }} de {{ totalRows }}
            </span>

            <div class="flex gap-1">
              <button
                class="p-1 rounded-full hover:bg-gray-100"
                [class.opacity-50]="isFirstPage"
                [disabled]="isFirstPage"
                (click)="onPreviousPage()"
              >
                <i-lucide [img]="ChevronLeft" class="w-5 h-5"></i-lucide>
              </button>

              <button
                class="p-1 rounded-full hover:bg-gray-100"
                [class.opacity-50]="isLastPage"
                [disabled]="isLastPage"
                (click)="onNextPage()"
              >
                <i-lucide [img]="ChevronRight" class="w-5 h-5"></i-lucide>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class TableComponent<T extends object> {
  @Input() color: string = 'gray';
  @Input() set data(value: T[]) {
    this.tableData.set(value);
  }
  @Input() columns: ColumnDef<T>[] = [];
  @Input() totalRows: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() onEdit = new EventEmitter<T[]>();
  @Output() onDelete = new EventEmitter<T[]>();
  @Output() onView = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  readonly MoreVertical = MoreVertical;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  tableData = signal<T[]>([]);
  activeRow = signal<T | null>(null);
  hoveredRow = signal<T | null>(null);

  table = createAngularTable(() => ({
    data: this.tableData(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
  }));

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get currentRange(): { start: number; end: number } {
    const pageSize = this.table().getState().pagination.pageSize;
    const start = (this.currentPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, this.totalRows);
    return { start, end };
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newPageSize = Number(target.value);
    this.pageChange.emit({ page: 1, pageSize: newPageSize });
  }

  onNextPage(): void {
    if (!this.isLastPage) {
      this.pageChange.emit({
        page: this.currentPage + 1,
        pageSize: this.table().getState().pagination.pageSize,
      });
    }
  }

  onPreviousPage(): void {
    if (!this.isFirstPage) {
      this.pageChange.emit({
        page: this.currentPage - 1,
        pageSize: this.table().getState().pagination.pageSize,
      });
    }
  }

  toggleActions(row: T): void {
    if (this.activeRow() === row) {
      this.activeRow.set(null);
    } else {
      this.activeRow.set(row);
    }
  }

  closeActions(): void {
    this.activeRow.set(null);
  }

  getRowBackground(row: T): string {
    const index = this.tableData().indexOf(row);
    const baseOpacity = index % 2 === 0 ? '10' : '00';

    if (this.activeRow() === row) {
      return this.color + '30';
    }
    if (this.hoveredRow() === row) {
      return this.color + '15';
    }
    return this.color + baseOpacity;
  }

  onRowHover(row: T): void {
    this.hoveredRow.set(row);
  }

  onRowLeave(): void {
    this.hoveredRow.set(null);
  }
}
