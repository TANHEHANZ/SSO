import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/public/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./presentation/pages/private/private.routes').then(
        (m) => m.PRIVATE_ROUTES
      ),
  },
];
