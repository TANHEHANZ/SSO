import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { ButtonChangeTheme } from '../../../shared/ui/button.theme';
import { RouteParamsService } from '@app/infraestructure/global/route-params.service';
import { FormStateService } from '@app/infraestructure/global/form-state.service';
import { TitleLoginComponent } from './components/title';
import { ButtonComponent } from '../../../shared/ui/button';
import { GoogleIconComponent } from '../../../shared/ui/icons/google';
import { InputComponent } from '../../../shared/ui/input';
import { CheckboxComponent } from '../../../shared/ui/check';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { DrawerService } from '@app/infraestructure/global/drawer.service';
import {
  IconMapping,
  iconMapping,
} from '../../../shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import gsap from 'gsap';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastComponent,
    LucideAngularModule,
    ButtonChangeTheme,
    TitleLoginComponent,
    GoogleIconComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    DrawerComponent,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  drawerS = inject(DrawerService);
  toastS = inject(ToastService);
  routeParams = inject(RouteParamsService);
  formState = inject(FormStateService);
  private router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  private loadingMessages = [
    'Preparando tu espacio de trabajo...',
    'Cargando tus proyectos...',
    'Configurando el dashboard...',
    'Casi listo...',
  ];
  iniciar = async () => {
    // Show loading screen
    const tl = gsap.timeline();
    tl.to('.loading-screen', {
      y: 0,
      duration: 0.8,
      ease: 'power4.out',
    });

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < this.loadingMessages.length) {
        gsap.to('.loading-message', {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            this.currentMessage = this.loadingMessages[messageIndex];
            gsap.to('.loading-message', {
              opacity: 1,
              duration: 0.3,
            });
          },
        });
        messageIndex++;
      }
    }, 1500);

    await new Promise((resolve) => setTimeout(resolve, 6000));

    clearInterval(interval);

    tl.to('.loading-screen', {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.in',
      onComplete: () => {
        this.router.navigate(['/client/integraciones']);
      },
    });
  };

  currentMessage: string = '';
}
