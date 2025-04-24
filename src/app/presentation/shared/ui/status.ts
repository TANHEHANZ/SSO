import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CircleDot, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'status-cell',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div
      class="flex items-center justify-center gap-2 px-3 py-1 rounded-full dark:text-white text-xs w-28"
      [style.backgroundColor]="getBackgroundColor()"
    >
      <i-lucide [img]="Dot" [style.color]="getIconColor()" size="16"></i-lucide>
      <span>{{ getTranslatedStatus() }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    `,
  ],
})
export class StatusCellRenderer implements ICellRendererAngularComp {
  readonly Dot = CircleDot;
  params: any;
  status: string = '';

  private statusTranslations: Record<string, string> = {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    BLOCKED: 'Bloqueado',
    SUSPENDED: 'Suspendido',
    DEACTIVATED: 'Desactivado',
    PENDING_VERIFICATION: 'Pendiente',
    PASSWORD_EXPIRED: 'Contraseña Expirada',
    LOCKED: 'Bloqueado',
    DELETED: 'Eliminado',
    EXTERNAL: 'Externo',
    ARCHIVED: 'Archivado',
  };

  agInit(params: any): void {
    this.params = params;
    this.status = params.value;
  }

  getTranslatedStatus(): string {
    return this.statusTranslations[this.status] || this.status;
  }

  getBackgroundColor(): string {
    const colors: Record<string, string> = {
      ACTIVE: '#D2EAE5',
      INACTIVE: '#E9898D',
      BLOCKED: '#FFE2E5',
      SUSPENDED: '#FFE2B8',
      DEACTIVATED: '#FFD6D9',
      PENDING_VERIFICATION: '#FFF4CC',
      PASSWORD_EXPIRED: '#FFE8D9',
      LOCKED: '#FFD6E5',
      DELETED: '#EBEDF3',
      EXTERNAL: '#D0F2FF',
      ARCHIVED: '#E9ECEF',
    };
    return colors[this.status] || '#E9ECEF';
  }

  getIconColor(): string {
    const colors: Record<string, string> = {
      ACTIVE: '#6D9B7E',
      INACTIVE: '#EA5353',
      BLOCKED: '#FF3B3B',
      SUSPENDED: '#FFB020',
      DEACTIVATED: '#FF4842',
      PENDING_VERIFICATION: '#FFC107',
      PASSWORD_EXPIRED: '#FF784E',
      LOCKED: '#FF4081',
      DELETED: '#637381',
      EXTERNAL: '#1890FF',
      ARCHIVED: '#919EAB',
    };
    return colors[this.status] || '#919EAB';
  }

  refresh(): boolean {
    return false;
  }
}
