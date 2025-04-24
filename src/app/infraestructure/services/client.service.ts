import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { createApiUrl, parseRouteKey } from '../config/api.config';
import { ClientRouteKeys } from '../models/globals/client';
import { Observable } from 'rxjs';

export class ClientService {
  private http = inject(HttpClient);
  private createUrl = createApiUrl();

  request<T extends ClientRouteKeys>(
    key: T,
    query?: API_ROUTES.ClientRoutes[T]['query']
  ): Observable<API_ROUTES.ClientRoutes[T]['response']> {
    const { method, path } = parseRouteKey(key);
    return this.http.request<API_ROUTES.ClientRoutes[T]['response']>(
      method.toLowerCase(),
      this.createUrl(key, query)
    );
  }
}
