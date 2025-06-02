import { ListServiceDTO } from '../models/service/list';

export const LIST_SERVICE: ListServiceDTO[] = [
  {
    id: '1',
    name: 'Autenticación',
    description:
      'Proporciona servicios de autenticación y autorización para proteger tus recursos.',
    icon: 'ShieldAlt',
    options: [
      {
        id: '1',
        name: 'Interna',
        description:
          'Permite validar credenciales contra directorios internos y sistemas propios de la GAMC',
        icon: 'ShieldAlt',
        metods: [
          {
            id: '001',
            name: 'CI',
            icon: 'ClipboardUser',
            description: 'Validar ci contra directorios internos',
          },
          {
            id: '002',
            icon: 'Envelope',
            name: 'Correo',
            description: 'Validar correo contra directorios internos',
          },
        ],
      },
      {
        id: '2',
        name: 'Externa',
        description:
          'ideal para el acceso a ciudadanos y terceros, manteniendo la seguridad y el control de acceso.',
        icon: 'Earth',
        metods: [
          {
            id: '001',
            icon: 'UserRound',
            name: 'Credenciales',
            description: 'Validar credenciales mediante email y contraseña',
          },
          {
            id: '002',
            name: 'Google',
            icon: 'google',
            description: 'Iniciar sesión mediante Google',
          },
          {
            id: '003',
            name: 'Email',
            icon: 'Envelope',
            description: 'Iniciar sesión mediante Email',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Validación de documentos',
    description:
      'Permite validar documentos que han sido firmados por jacubitus',
    icon: 'FolderOpen',
  },
];
