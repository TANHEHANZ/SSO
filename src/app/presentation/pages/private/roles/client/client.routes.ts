import { Routes } from '@angular/router';
import { ProyectsComponent } from './proyects/proyects.component';
import { ClientLayoutComponent } from './client.layout.compoent';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/client.dashboard.component').then(
            (m) => m.ClientDashboardComponent
          ),
      },
      {
        path: 'proyects',
        loadComponent: () =>
          import('./proyects/proyects.component').then(
            (m) => m.ProyectsComponent
          ),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./users/client.users.component').then(
            (m) => m.ClientUsersComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'reportes',
    pathMatch: 'full',
  },
];
