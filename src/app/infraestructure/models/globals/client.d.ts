import { ClientResponseDTO } from '../client/response';

export {};
declare global {
  namespace API_ROUTES {
    interface ClientRoutes {
      'GET v1/api/client': {
        response: API_RESPONSE.GlobalResponse<ClientResponseDTO>;
        query: never;
      };
      'POST v1/api/client': {
        response: API_RESPONSE.GlobalResponse<ClientResponseDTO>;
        query: never;
      };
    }
  }
}

export type ClientRouteKeys = keyof API_ROUTES.ClientRoutes;
