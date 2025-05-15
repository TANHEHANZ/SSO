import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import { IntegrationDTO } from '@app/infraestructure/models/integrations/integraion.response';
import { IntegrationService } from '@app/infraestructure/services/integration.service';
import {
  iconMapping,
  IconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import gsap from 'gsap';

@Component({
  selector: 'client-service-panel',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <aside
      #configPanel
      class="bg-white rounded-tr-lg opacity-1 p-8 transform -translate-x-full fixed left-0 bottom-0 min-w-[40dvw] z-30 h-[85dvh] border-r flex flex-col gap-4"
    >
      <section
        class="flex flex-col gap-1 w-full self-start justify-start items-start"
      >
        <h3 class="font-medium text-primary-theme_cian-light text-3xl">
          <fa-icon [icon]="getIcon('Layer')" class="text-4xl bg-inherit" />
          Espacio de trabajo
        </h3>
        <p
          class="bg-primary-theme_maguenta-dark/10 text-primary-theme_maguenta-dark text-xs rounded-lg px-2 py-1"
        >
          Solo visualización
        </p>
      </section>

      <div
        class="flex-1 flex flex-col items-center justify-center gap-4 w-full"
      >
        @if (integrationS.currentConfig$ | async; as config) { @for (service of
        config.services; track service.id) {
        <div
          class="border relative rounded-lg w-48 p-4 transition-all bg-white flex flex-col justify-center items-center gap-1 border-primary-theme_cian-light"
        >
          <p
            class="absolute left-2 top-2 bg-primary-theme_cian-light/10 text-primary-theme_cian-light text-xs rounded-lg px-2 py-1"
          >
            Servicios
          </p>
          <fa-icon [icon]="getIcon(service.icon)" class="inherit text-xl" />
          <p class="text-md text-center">{{ service.name }}</p>
        </div>
        } }
      </div>
    </aside>
  `,
})
export class ClientServicePanelComponent implements OnInit {
  toastS = inject(ToastService);
  @ViewChild('configPanel') configPanel!: ElementRef;
  integrationS = inject(IntegrationService);

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }
  ngOnInit(): void {
    this.integrationS.currentConfig$.subscribe((config) => {
      if (config.showPanel) {
        console.log('show');
        gsap.to(this.configPanel.nativeElement, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
        });
      } else {
        gsap.to(this.configPanel.nativeElement, {
          x: '-100%',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    });
  }
}
