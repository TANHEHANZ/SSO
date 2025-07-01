import { Component, Inject } from '@angular/core';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { ListService } from './components/list.component';
import { CommonModule } from '@angular/common';
import { PanelService } from '@app/infraestructure/services/components/panel.service';
import { FormService } from './components/form.component';

@Component({
  selector: 'template-service',
  template: `
    <section>
      <app-toast></app-toast>
      <app-drawer
        title="Configuración de cuenta de usuario"
        [icon]="'settings'"
      >
        <ng-container *ngIf="drawerS.drawerState$ | async">
          <service-form />
        </ng-container>
      </app-drawer>
      <service-list />
    </section>
  `,
  imports: [
    ToastComponent,
    DrawerComponent,
    ListService,
    CommonModule,
    FormService,
  ],
})
export class TemplateService {
  drawerS = Inject(PanelService);
}
