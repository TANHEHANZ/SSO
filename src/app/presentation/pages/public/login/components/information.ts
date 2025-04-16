import { Component, input } from '@angular/core';
import { Bento1Component, QueryParams } from './bento/1';
import { Bento4Component } from './bento/4';
import { Bento6Component } from './bento/6';

@Component({
  selector: 'information-login',
  imports: [Bento1Component, Bento4Component, Bento6Component],
  template: `
    <article
      class="relative overflow-hidden h-[85dvh] my-auto  grid gap-4 mr-4 border-l-2 pl-4 dark:border-gray-500 max-w-[40dvw]"
    >
      <div class=" flex flex-col justify-center items-center gap-4 p-8  ">
        @if(params().redirect_uri){
        <bento-1 [query]="params()" class="w-full" />
        }
        <bento-4 />
        <bento-6 />
      </div>
    </article>
  `,
})
export class InformationComponent {
  params = input<QueryParams>({});
}
