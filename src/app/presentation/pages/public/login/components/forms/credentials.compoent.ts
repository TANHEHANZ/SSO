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
import { LogIn, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '@app/infraestructure/services/auth';

@Component({
  selector: 'credential-component',
  template: `
    <form
      class="flex flex-col justify-center items-center w-full gap-4 "
      [formGroup]="form"
    >
      <h1 class="flex text-4xl gap-2 font-normal text-center relative">
        <p
          class="text-xs bg-primary-theme_orage absolute -top-6 left-0 px-2 py-0.5 rounded-md"
        >
          credenciales
        </p>
        Formulario de inicio
      </h1>
      <p
        class="text-sm text-gray-600 text-center bg-indigo-300/20 p-4 rounded-xl "
      >
        Por tu seguridad, tienes 3 intentos disponibles para acceder a tu cuenta
      </p>
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
      <app-button variant="primary" class="w-full" (onClick)="login()">
        <i-lucide [img]="loginLucide" class="my-icon"></i-lucide>
        Iniciar seción</app-button
      >
    </form>
  `,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
})
export class credentialFormComponent {
  readonly loginLucide = LogIn;
  authS = inject(AuthService);
  toasS = inject(ToastService);
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
  });
  login() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.toasS.addToast({
        title: 'Inicio de seción',
        description: 'Revisa los datos introducidos',
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
            title: 'Inicio de seción',
            description: 'Bienvenido',
            id: 'login',
            type: 'success',
          });
        },
        error: (err) => {
          console.log(err);
          this.toasS.addToast({
            title: 'Inicio de seción',
            description: err.error.message,
            id: 'login',
            type: 'error',
          });
          this.form.reset();
        },
      });
  }
}
