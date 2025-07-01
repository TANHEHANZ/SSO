import { Routes } from '@angular/router';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./private.layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (c) => c.TemplateDashboard
          ),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./configuration/configuration.component').then(
            (c) => c.TemplateConfiguration
          ),
        children: [
          {
            path: 'profile',
            loadComponent: () =>
              import('./configuration/profile/profile.component').then(
                (c) => c.ProfileComponent
              ),
          },
          {
            path: 'proyects',
            loadComponent: () =>
              import('./configuration/proyects/proyect.component').then(
                (c) => c.ProyectComponent
              ),
            children: [
              {
                path: 'enviroments',
                loadComponent: () =>
                  import(
                    './configuration/proyects/workspace/enviroments/enviroments.component'
                  ).then((c) => c.SettingWorksaceEnv),
              },
              {
                path: 'integration',
                loadComponent: () =>
                  import(
                    './configuration/proyects/workspace/integration/integration.component'
                  ).then((c) => c.SettingWorksaceIntegrations),
              },
              {
                path: 'token',
                loadComponent: () =>
                  import(
                    './configuration/proyects/workspace/token/token.component'
                  ).then((c) => c.SettingWorksaceTokns),
              },
              {
                path: 'web-hoocks',
                loadComponent: () =>
                  import(
                    './configuration/proyects/workspace/webhooks/webhook.component'
                  ).then((c) => c.SettingWorksaceWebHooks),
              },
            ],
          },
        ],
      },
      {
        path: 'integration',
        loadComponent: () =>
          import('./integrations/integration.component').then(
            (c) => c.IntegrationComponent
          ),
        children: [
          {
            path: 'logs',
            loadComponent: () =>
              import('./integrations/logs/logs.component').then(
                (c) => c.LogsComponent
              ),
          },
        ],
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(
            (c) => c.TemplateService
          ),
        children: [
          {
            path: 'logs',
            loadComponent: () =>
              import('./integrations/logs/logs.component').then(
                (c) => c.LogsComponent
              ),
          },
        ],
      },
    ],
  },
];
