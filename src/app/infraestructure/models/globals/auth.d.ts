import { GoogleAuthResponseType, QueryGoogleType } from '../auth/google';
// inicial v1/api/authentication/

export {};
declare global {
  namespace API_ROUTES {
    interface AUTH_GOOGLE {
      'user/google': {
        data: GoogleAuthResponseType;
        query: QueryGoogleType;
      };
    }
    interface AUTH_CREDENTIALS {
      'user/credential': {
        data: GoogleAuthResponseType;
        query: QueryGoogleType;
      };
    }
    interface AUTH_CI {
      'user/ci': {
        data: GoogleAuthResponseType;
        query: QueryGoogleType;
      };
    }
    type routesKey = keyof API_ROUTES;
    type routesData<K extends routesKey> = API_ROUTES[K]['data'];
    type routesQuery<K extends queryKeys> = API_ROUTES[K]['ttl'];
  }
}
