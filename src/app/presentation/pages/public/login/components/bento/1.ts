import { Component, input } from '@angular/core';
export interface QueryParams {
  client_id?: string;
  redirect_uri?: string;
}
@Component({
  selector: 'bento-1',
  imports: [],
  template: `
    <div
      class="rounded-2xl w-full h-full flex flex-col justify-center items-start p-4 text-center"
    >
      <p
        class="font-medium text-xs bg-primary-theme_orage px-2 py-1 rounded-lg"
      >
        Redirección
      </p>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {{ query().redirect_uri || 'Página principal' }}
      </p>
    </div>
  `,
})
export class Bento1Component {
  query = input<QueryParams>({});
}
