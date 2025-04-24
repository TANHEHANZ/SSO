import { environment } from './config';

type RouteKeys = keyof API_ROUTES.ClientRoutes;

export function parseRouteKey<T extends RouteKeys>(routeKey: T) {
  const [method, ...rest] = routeKey.split(' ');
  const path = rest.join(' ');

  return {
    method: method as 'GET' | 'POST' | 'PUT' | 'DELETE',
    path,
  };
}

export const createApiUrl =
  () =>
  <T extends RouteKeys>(
    routeKey: T,
    query?: API_ROUTES.ClientRoutes[T]['query']
  ): string => {
    const { path } = parseRouteKey(routeKey);
    const baseUrl = environment.API_BACK;
    const url = `${baseUrl}/${path}`;

    if (!query) return url;

    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });

    return `${url}?${params.toString()}`;
  };
