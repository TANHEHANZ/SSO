import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
import { QueryParams } from './components/bento/1';
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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
  params: QueryParams = this.routeParams.getParams();
}
