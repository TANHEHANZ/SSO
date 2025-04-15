import { Component } from '@angular/core';

@Component({
  selector: 'bento-1',
  imports: [],
  template: `
    <div
      class="bg-indigo-300/20 rounded-2xl w-full h-full flex justify-center items-center"
    >
      <img
        src="./assets/images/escudo.png"
        alt="Logo"
        class="w-[70%] object-cover"
      />
    </div>
  `,
})
export class Bento1Component {}
