import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly URL = environment.API_BACK + '/v1/api/authentication';
  private http = inject(HttpClient);

  googleLogin(params: { client_id?: string; redirect_uri?: string }) {
    const ROUTE = 'user/google';
    const queryParams = new URLSearchParams(params).toString();
    window.location.href = `${this.URL}/${ROUTE}?${queryParams}`;
    return;
  }
}
