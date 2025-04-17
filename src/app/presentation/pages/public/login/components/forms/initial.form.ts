import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button';
import { GoogleIconComponent } from '../../../../../shared/ui/icons/google';
import { AuthService } from '@app/infraestructure/services/auth';
import { QueryParams } from '../bento';
import {
  FormStateService,
  FormType,
} from '@app/infraestructure/global/form-state.service';
import { TitleLoginComponent } from '../title';

@Component({
  selector: 'inital-form-login',
  template: ` <form
    #loginForm
    (submit)="$event.preventDefault()"
    class=" w-full flex flex-col justify-center items-center "
  >
    <title-login />
    <app-button
      [type]="'submit'"
      [variant]="'terteary'"
      (onClick)="onSubmit('google')"
    >
      <app-google-icon [size]="24" />
      Iniciar secíon con google
    </app-button>
    <div
      class="w-1/2 mx-auto relative flex justify-center items-center h-[0.4px] bg-gray-400 my-3"
    >
      <p
        class="absolute bg-white px-2 text-xs dark:bg-slate-900 dark:text-white"
      >
        O
      </p>
    </div>
    <app-button
      [type]="'submit'"
      [variant]="'primary'"
      (onClick)="onSubmit('email')"
    >
      Continuar con Email y password
    </app-button>
    <div
      class="w-1/2 mx-auto relative flex justify-center items-center h-[0.4px] bg-gray-400 my-3"
    >
      <p
        class="absolute bg-white px-2 text-xs dark:bg-slate-900 dark:text-white"
      >
        O
      </p>
    </div>
    <app-button
      [type]="'submit'"
      [variant]="'secondary'"
      (onClick)="onSubmit('ci')"
    >
      Continuar con ci y password
    </app-button>
    <div class="flex gap-2 items-center justify-center mt-2 ">
      <p>Crear cuenta</p>
      <p>¿Necesitas ayuda?</p>
    </div>
  </form>`,
  imports: [ButtonComponent, GoogleIconComponent, TitleLoginComponent],
})
export class InitialFormLogin {
  @ViewChild('loginForm') formElement!: ElementRef;
  private authS = inject(AuthService);
  private formState = inject(FormStateService);
  params: QueryParams = {};

  onSubmit(type: string) {
    switch (type) {
      case 'google':
        this.authS.googleLogin(this.params);
        break;
      case 'email':
        this.formState.toggleFormExpansion(true, 'email');
        break;
      case 'ci':
        this.formState.toggleFormExpansion(true, 'ci');
        break;
    }
  }
}
