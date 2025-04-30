import { inject, Injectable } from '@angular/core';
import { client } from '../lib/fetch/modules.ts/client.api';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  httpService = inject(HttpService);
  getClients(page: number = 1, limit: number = 5) {
    return this.httpService.request(client.all);
  }
}
