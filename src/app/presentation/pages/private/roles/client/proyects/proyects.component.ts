import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button';
import { InputComponent } from '../../../../../shared/ui/input';
import {
  IconMapping,
  iconMapping,
} from '@app/presentation/shared/ui/icons/icon.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import LeaderLine from 'leader-line-new';
interface Proyect {
  name: string;
  service: string;
  Domains: string;
  method: {
    method: string;
  }[];
}

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styles: [
    `
      .box {
        width: 100px;
        height: 100px;
        background: #eee;
        margin: 40px;
        display: inline-block;
      }
    `,
  ],
  standalone: true,
  imports: [ButtonComponent, InputComponent, CommonModule, FontAwesomeModule],
})
export class ProyectsComponent {
  proyects: Proyect[] = [
    // {
    //   name: 'Firmas Gamc',
    //   service: 'Autenticación',
    //   Domains: 'https:firmagamc.dev.cochamba.bo',
    //   method: [
    //     {
    //       method: 'google',
    //     },
    //     {
    //       method: 'ci',
    //     },
    //   ],
    //   fechaCreacion: '2024-01-15',
    //   estado: 'ACTIVO',
    // },
  ];
  @ViewChild('box1', { static: true }) box1!: ElementRef;
  @ViewChild('box2', { static: true }) box2!: ElementRef;
  isDropdownOpen = false;
  filterOptions = ['Más recientes', 'Más antiguos', 'Por nombre'];

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  private line: any;
  ngAfterViewInit() {
    if (this.box1 && this.box2) {
      this.line = new LeaderLine(
        this.box1.nativeElement,
        this.box2.nativeElement,
        {
          dash: { animation: true },
          color: 'red',
          size: 4,
          path: 'straight',
          endPlug: 'none',
          startPlug: 'none',
        } as any
      );
      this.line.canvas.style.zIndex = 1000;
    }
  }
  ngOnDestroy() {
    if (this.line) {
      this.line.remove();
    }
  }
}
