import { Routes } from '@angular/router';
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
        path: 'integraciones',
        loadComponent: () =>
          import('./integraciones/integraciones.component').then(
            (m) => m.ClientIntegracionesComponent
          ),
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('./logs/logs.component').then((m) => m.ClientLogsComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(
            (m) => m.ClientServicesComponent
          ),
      },
      {
        path: 'settings',
        children: [
          {
            path: 'proyects',
            loadComponent: () =>
              import('./settings/proyects/proyect.component').then(
                (m) => m.ClientProyectComponent
              ),
            children: [
              {
                path: 'workspace',
                children: [
                  {
                    path: 'general',
                    loadComponent: () =>
                      import(
                        './settings/proyects/workspace/general/general.component'
                      ).then((m) => m.ClientSettingWorksaceGeneral),
                  },
                  {
                    path: 'environments',
                    loadComponent: () =>
                      import(
                        './settings/proyects/workspace/enviroments/enviroments.component'
                      ).then((m) => m.ClientSettingWorksaceEnv),
                  },
                  {
                    path: 'integrations',
                    loadComponent: () =>
                      import(
                        './settings/proyects/workspace/integration/integration.component'
                      ).then((m) => m.ClientSettingWorksaceIntegrations),
                  },
                  {
                    path: 'tokens',
                    loadComponent: () =>
                      import(
                        './settings/proyects/workspace/token/token.component'
                      ).then((m) => m.ClientSettingWorksaceTokns),
                  },

                  {
                    path: 'webhooks',
                    loadComponent: () =>
                      import(
                        './settings/proyects/workspace/webhooks/webhook.component'
                      ).then((m) => m.ClientSettingWorksaceWebHooks),
                  },
                ],
              },
            ],
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./settings/profile/profile.component').then(
                (m) => m.ClientProfileComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
