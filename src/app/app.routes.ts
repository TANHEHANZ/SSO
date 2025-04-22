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
      import('./presentation/pages/private/admin.routes').then(
        (m) => m.ADMIN_ROUTES
      ),
  },
];
