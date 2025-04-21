import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button';
import { CheckboxComponent } from '../../../../../shared/ui/check';
import { InputComponent } from '../../../../../shared/ui/input';
import { LogIn, LucideAngularModule, UserPlus } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/infraestructure/services/auth';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { ErrorHandlerService } from '@app/infraestructure/global/error-handler.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ci-component',
  template: `
    <form
      class="flex flex-col justify-center  w-full gap-4 "
      [formGroup]="form"
    >
      <h1 class="flex text-4xl gap-2 font-medium relative dark:text-white">
        <p
          class="text-xs bg-primary-theme_light absolute -top-6 left-0 px-2 py-0.5 rounded-md text-white"
        >
          Cédula de identidad
        </p>
        Formulario de inicio
      </h1>

      <app-input
        formControlName="ci"
        [label]="'Ci'"
        class="w-full"
        [error]="
          form.get('ci')?.touched && form.get('ci')?.errors ? 'ci inválido' : ''
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
                class="text-primary-theme_light hover:underline "
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
    CheckboxComponent,
    InputComponent,
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class CiFormComponent {
  readonly loginLucide = LogIn;
  readonly UserPlus = UserPlus;
  authS = inject(AuthService);
  toasS = inject(ToastService);
  errorHandler = inject(ErrorHandlerService);
  form = new FormGroup({
    ci: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6,8}$/),
      Validators.minLength(6),
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
    console.log(this.form.valid);
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
      .ciLogin({
        ci_number: this.form.get('ci')?.value!,
        password: this.form.get('password')?.value!,
        provider: 'CI',
      })
      .subscribe({
        next: () => {
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
