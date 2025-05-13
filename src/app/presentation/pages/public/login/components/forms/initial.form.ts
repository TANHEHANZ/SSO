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
import { InputComponent } from '../../../../../shared/ui/input';
import { CheckboxComponent } from '../../../../../shared/ui/check';

@Component({
  selector: 'inital-form-login',
  template: ` <form
    #loginForm
    (submit)="$event.preventDefault()"
    class=" w-full flex flex-col justify-center items-center  h-full"
  >
    <title-login />
    <app-button [type]="'submit'" (onClick)="googleLogin()">
      <app-google-icon [size]="24" />
      Iniciar secíon con google
    </app-button>

    <!-- <app-button
      [type]="'submit'"
      [variant]="'primary'"
      (onClick)="onSubmit('email')"
    >
      Continuar con Email y password
    </app-button> -->

    <div class="my-8 flex flex-col gap-2">
      <app-input [label]="'Email'" class="w-full"></app-input>
      <app-input
        formControlName="password"
        [label]="'Password'"
        [type]="'password'"
        class="w-full"
      ></app-input>
      <div class="mt-2">
        <div class="mt-2">
          <div class="mt-2">
            <app-checkbox id="terms">
              Acepto los
              <a
                href="/terms"
                class="text-primary-theme_orage hover:underline dark:text-primary-theme_orage/80"
              >
                términos y condiciones
              </a>
              de uso
            </app-checkbox>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <app-button variant="secondary" class=""> Registrarse </app-button>
        <app-button variant="primary" class="w-full">
          Iniciar sesión
        </app-button>
      </div>
    </div>

    <!-- 
    <app-button
      [type]="'submit'"
      [variant]="'secondary'"
      (onClick)="onSubmit('ci')"
    >
      Continuar con ci y password
    </app-button> -->
    <div class="flex gap-2 items-center justify-center mt-2 ">
      <p>Crear cuenta</p>
      <p>¿Necesitas ayuda?</p>
    </div>
  </form>`,
  imports: [
    ButtonComponent,
    GoogleIconComponent,
    TitleLoginComponent,
    InputComponent,
    CheckboxComponent,
  ],
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
