import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NavApi } from '../lib/fetch/modules.ts/nav.api';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  http = inject(HttpService);
  getAllNavItems() {
    return this.http.request(NavApi.all);
  }
}
