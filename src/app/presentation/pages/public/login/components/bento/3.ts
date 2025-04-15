import { Component } from '@angular/core';

@Component({
  selector: 'bento-3',
  imports: [],
  template: `
    <div
      class="bg-primary-theme_purple rounded-2xl relative overflow-hidden w-full h-full"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        class="absolute  w-full h-full object-cover "
      >
        <source src="./assets/video/background03.mp4" type="video/mp4" />
      </video>
    </div>
  `,
})
export class Bento3Component {}
