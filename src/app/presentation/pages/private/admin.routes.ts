import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout.component';
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'settings',
        children: [
          {
            path: 'roles',
            loadComponent: () =>
              import('./settings/roles/roles.component').then(
                (m) => m.RolesComponent
              ),
          },
          {
            path: 'audit',
            loadComponent: () =>
              import('./settings/audit/audit.component').then(
                (m) => m.AuditComponent
              ),
          },
          {
            path: 'ips',
            loadComponent: () =>
              import('./settings/ips/ips.component').then(
                (m) => m.IpsComponent
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
