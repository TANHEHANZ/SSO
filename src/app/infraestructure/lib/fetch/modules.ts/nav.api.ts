import { NavResponseSchema } from '@app/infraestructure/models/nav/response.nav';

export const NavApi = {
  all: {
    path: 'GET v1/api/nav/all',
    response: NavResponseSchema,
    query: null,
    isPaginated: false,
  },
};
