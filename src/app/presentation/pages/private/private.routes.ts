import { Routes } from '@angular/router';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.TemplateDashboard
      ),
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./configuration/configuration.component').then(
        (c) => c.TemplateConfiguration
      ),
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./configuration/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'proyects',
        loadChildren: () =>
          import('./configuration/proyects/proyect.component').then(
            (c) => c.ProyectComponent
          ),
        children: [
          {
            path: 'enviroments',
            loadChildren: () =>
              import(
                './configuration/proyects/workspace/enviroments/enviroments.component'
              ).then((c) => c.SettingWorksaceEnv),
          },
          {
            path: 'integration',
            loadChildren: () =>
              import(
                './configuration/proyects/workspace/integration/integration.component'
              ).then((c) => c.SettingWorksaceIntegrations),
          },
          {
            path: 'token',
            loadChildren: () =>
              import(
                './configuration/proyects/workspace/token/token.component'
              ).then((c) => c.SettingWorksaceTokns),
          },
          {
            path: 'web-hoocks',
            loadChildren: () =>
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
    loadChildren: () =>
      import('./integrations/integration.component').then(
        (c) => c.IntegrationComponent
      ),
    children: [
      {
        path: '/logs',
        loadChildren: () =>
          import('./integrations/logs/logs.component').then(
            (c) => c.LogsComponent
          ),
      },
    ],
  },

  {
    path: 'services',
    loadChildren: () =>
      import('./services/services.component').then((c) => c.TemplateService),
    children: [
      {
        path: '/logs',
        loadChildren: () =>
          import('./integrations/logs/logs.component').then(
            (c) => c.LogsComponent
          ),
      },
    ],
  },
];
