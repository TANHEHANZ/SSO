import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button';
import { InputComponent } from '../../../../../shared/ui/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { LogIn, LucideAngularModule, UserPlus } from 'lucide-angular';
import { AuthService } from '@app/infraestructure/services/auth';
import { ErrorHandlerService } from '@app/infraestructure/global/error-handler.service';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../../../../shared/ui/check';

@Component({
  selector: 'credential-component',
  template: `
    <form
      class="flex flex-col justify-center  w-full gap-4 "
      [formGroup]="form"
    >
      <h1 class="flex text-4xl gap-2 font-medium relative dark:text-white">
        <p
          class="text-xs bg-primary-theme_orage absolute -top-6 left-0 px-2 py-0.5 rounded-md text-white"
        >
          credenciales
        </p>
        Formulario de inicio
      </h1>

      <app-input
        formControlName="email"
        [label]="'Email'"
        class="w-full"
        [error]="
          form.get('email')?.touched && form.get('email')?.errors
            ? 'Email inválido'
            : ''
        "
      ></app-input>
      <app-input
        formControlName="password"
        [label]="'Password'"
        [type]="'password'"
        class="w-full"
        [error]="
          form.get('password')?.touched && form.get('password')?.errors
            ? 'El password debe tener al menos 6 caracteres y debe contener letras y números'
            : ''
        "
      ></app-input>
      <div class="mt-2">
        <div class="mt-2">
          <div class="mt-2">
            <app-checkbox
              formControlName="acceptTerms"
              id="terms"
              [error]="
                !form.get('acceptTerms')?.touched &&
                !form.get('acceptTerms')?.value
              "
            >
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
        <app-button variant="secondary" class="">
          <i-lucide [img]="UserPlus" class="my-icon"></i-lucide>
          Registrarse
        </app-button>
        <app-button variant="primary" class="w-full" (onClick)="login()">
          <i-lucide [img]="loginLucide" class="my-icon"></i-lucide>
          Iniciar sesión
        </app-button>
      </div>
    </form>
  `,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    LucideAngularModule,
    CommonModule,
    CheckboxComponent,
  ],
})
export class credentialFormComponent {
  readonly loginLucide = LogIn;
  readonly UserPlus = UserPlus;
  authS = inject(AuthService);
  toasS = inject(ToastService);
  errorHandler = inject(ErrorHandlerService);
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/
      ),
    ]),
    acceptTerms: new FormControl(false, [Validators.requiredTrue]),
  });
  login() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.toasS.addToast({
        title: 'Inicio de sesión',
        description: 'Por favor, verifica los datos ingresados para continuar',
        id: 'login',
        type: 'info',
      });
      return;
    }
    this.authS
      .emailLogin({
        email: this.form.get('email')?.value!,
        password: this.form.get('password')?.value!,
        provider: 'CREDENTIALS',
      })
      .subscribe({
        next: (value) => {
          this.toasS.addToast({
            title: 'Inicio de sesión',
            description: '¡Bienvenido! Nos alegra verte de nuevo',
            id: 'login',
            type: 'success',
          });
        },
        error: (err) => {
          const { message, type } = this.errorHandler.getErrorMessage(err);
          this.toasS.addToast({
            title: 'Inicio de sesión',
            description: message,
            id: 'login',
            type,
          });
          this.form.reset();
        },
      });
  }
}
