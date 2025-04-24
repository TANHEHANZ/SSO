import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: 'reports',
            loadComponent: () =>
              import('./dashboard/reportes/reportes.component').then(
                (m) => m.ReportesComponent
              ),
          },
          {
            path: 'alert',
            loadComponent: () =>
              import('./dashboard/alert/alert.component').then(
                (m) => m.AlertComponent
              ),
          },
          {
            path: 'exports',
            loadComponent: () =>
              import('./dashboard/exports/exports.component').then(
                (m) => m.ExportsComponent
              ),
          },
        ],
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./clientes/clientes.component').then(
            (m) => m.ClientesCompoent
          ),
      },
      {
        path: 'configuraciones',
        children: [
          {
            path: 'parametros',
            loadComponent: () =>
              import('./settings/settings/settings.component').then(
                (m) => m.SettingsComponent
              ),
          },
          {
            path: 'roles',
            loadComponent: () =>
              import('./settings/roles/roles.component').then(
                (m) => m.RolesComponent
              ),
          },
          {
            path: 'permisos',
            loadComponent: () =>
              import('./settings/permissions/permissions.component').then(
                (m) => m.PermissionsComponent
              ),
          },
          {
            path: 'auditoria',
            loadComponent: () =>
              import('./settings/audit/audit.component').then(
                (m) => m.AuditComponent
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'reportes',
        pathMatch: 'full',
      },
    ],
  },
];
