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
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';

@Component({
  selector: 'inital-form-login',
  template: ` <form
    #loginForm
    (submit)="$event.preventDefault()"
    class=" w-full flex flex-col justify-center items-center "
  >
    <title-login />
    <app-button [type]="'submit'" (onClick)="googleLogin()">
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
  private toastS = inject(ToastService);
  params: QueryParams = {};
  googleLogin(): void {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      `http://localhost:3002/v1/api/authentication/google?display=popup`,
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Check popup URL changes
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener('message', handleMessage);
        return;
      }

      try {
        const popupUrl = popup.location.href;
        if (popupUrl.includes('status=')) {
          clearInterval(checkPopup);

          const urlParams = new URLSearchParams(popup.location.search);
          const status = urlParams.get('status');

          if (status === 'success') {
            console.log(popup.location.hash);
            const hash = popup.location.hash;
            const token = hash.split('access_token=')[1]?.split('&')[0];

            if (token) {
              this.handleAuthSuccess(token);
            }
          } else {
            const errorMessage = urlParams.get('message');
            console.log(errorMessage);
            this.toastS.addToast({
              title: 'Error de autenticación',
              description:
                errorMessage ||
                'No se pudo completar el inicio de sesión con Google',
              type: 'error',
              id: 'google-auth-error',
            });
          }

          popup.close();
        }
      } catch (error) {
        // Handle cross-origin errors silently
      }
    }, 1000);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.origin) {
        clearInterval(checkPopup);
        // ... rest of the message handling ...
      }
    };

    window.addEventListener('message', handleMessage);
  }
  onSubmit(type: string) {
    switch (type) {
      case 'google':
        // if (!this.params.client_id || !this.params.redirect_uri) {
        //   this.toastS.addToast({
        //     title: 'Método no disponible',
        //     description:
        //       'El inicio de sesión con Google no está habilitado en este momento',
        //     type: 'error',
        //     id: 'google-auth',
        //   });
        //   return;
        // }

        break;
      case 'email':
        this.formState.toggleFormExpansion(true, 'email');
        break;
      case 'ci':
        this.formState.toggleFormExpansion(true, 'ci');
        break;
    }
  }
  private handleAuthSuccess(token: string) {
    localStorage.setItem('token', token);
    // Additional logic for successful login
  }
}
