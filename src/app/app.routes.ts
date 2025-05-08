import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/public/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./presentation/pages/private/roles/admin/admin.routes').then(
        (m) => m.ADMIN_ROUTES
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./presentation/pages/private/roles/client/client.routes').then(
        (m) => m.CLIENT_ROUTES
      ),
  },
];
