import { Component } from '@angular/core';
import { FileIcon } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/ui/button';
import { GoogleIconComponent } from '../../../shared/ui/icons';
import { TitleLoginComponent } from './components/title';
import { BackgroundPathsComponent } from '../../../shared/backgraund';
import { InputComponent } from '../../../shared/ui/input';
import { TabContainerComponent } from '../../../shared/ui/tab';
import { CheckboxComponent } from '../../../shared/ui/check';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    GoogleIconComponent,
    TitleLoginComponent,
    BackgroundPathsComponent,
    InputComponent,
    TabContainerComponent,
    CheckboxComponent,
    ReactiveFormsModule,
  ],
  template: `
    <main class="grid grid-cols-2 w-full h-screen overflow-hidden ">
      <article
        class="relative -skew-x-6 transform scale-110 -translate-x-2 bg-black"
      >
        <h2 class="font-bold 4xl text-white absolute top-4 left-4 z-10">
          Acceda a servicios de GAMC con una sola cuenta
        </h2>
        <div class="skew-x-6 transform w-full h-full relative">
          <div class="absolute inset-0">
            <background-paths />
          </div>
        </div>
      </article>
      <section class="flex justify-center items-center flex-col w-full">
        <title-login />
        <form class="flex w-1/2 justify-center items-center flex-col gap-4">
          <app-button [type]="'button'" [variant]="'secondary'" class="w-full">
            <app-google-icon />
            Iniciar sesión con Google
          </app-button>
          <app-tab-container
            [tabs]="tabs"
            [selectedTab]="tabs[0]"
            (tabChange)="onTabChange($event)"
            class="w-full"
          />
          <app-input label="Email" type="email" id="email" class="w-full" />
          <app-input
            label="Password"
            type="password"
            id="password"
            class="w-full"
          />
          <app-checkbox class="w-full" [formControl]="termsControl"
            >Aceptar terminos y condiciones</app-checkbox
          >

          <app-button [type]="'submit'" [variant]="'primary'" class="w-full">
            Iniciar sesión
          </app-button>
        </form>
      </section>
    </main>
  `,
  standalone: true,
})
export class LoginComponent {
  readonly FileIcon = FileIcon;
  handleClick(event: Event) {
    console.log('click', event);
  }
  termsControl = new FormControl(false);
  tabs = [
    { id: 1, label: 'Credenciales' },
    { id: 2, label: 'Cedula de indentidad' },
  ];

  onTabChange(event: any) {
    console.log('tab change');
  }
}
