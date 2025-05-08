import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-client-layout',
  template: ` <router-outlet> hola ? cliente </router-outlet>`,
})
export class ClientLayoutComponent {}
