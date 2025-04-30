import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  createApiUrl,
  parseRoute,
  RouteDefinition,
} from '../lib/fetch/config.api';
import { map } from 'rxjs';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private createUrl = createApiUrl();

  constructor(private http: HttpClient) {}

  request<T extends RouteDefinition<any, any>>(
    route: T,
    query?: z.infer<NonNullable<T['query']>>
  ) {
    const { method, path } = parseRoute(route.path);

    return this.http
      .request<z.infer<T['response']>>(
        method.toUpperCase(),
        this.createUrl(route.path, query)
      )
      .pipe(
        map((response) => {
          const parsedResponse = route.response.parse(response.data);
          return parsedResponse;
        })
      );
  }
}
