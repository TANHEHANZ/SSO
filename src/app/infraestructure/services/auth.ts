import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly URL = environment.API_BACK + '/v1/api/authentication';
  private http = inject(HttpClient);
  googleLogin() {
    const ROUTE = 'user/google' as const;
    type Route = typeof ROUTE;
    return this.http.get<API_ROUTES.AUTH_GOOGLE[Route]['data']>(
      `${this.URL}/${ROUTE}` as Route
    );
  }
}
