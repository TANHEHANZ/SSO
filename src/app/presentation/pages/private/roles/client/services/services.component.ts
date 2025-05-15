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
  templateUrl: './services.component.html',
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
export class ClientServicesComponent {
  proyects: Proyect[] = [];
  @ViewChild('box1', { static: false }) box1!: ElementRef;
  @ViewChild('box2', { static: false }) box2!: ElementRef;
  isDropdownOpen = false;
  filterOptions = ['Más recientes', 'Más antiguos', 'Por nombre'];

  getIcon(iconName: keyof IconMapping): any {
    return iconMapping[iconName];
  }

  private line: any;
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.box1 && this.box2) {
        this.line = new LeaderLine(
          this.box1.nativeElement,
          this.box2.nativeElement,
          {
            dash: { len: 1, gap: 5 },
            color: '#666',
            size: 2,
            path: 'grid',
            startSocket: 'top',
            endSocket: 'bottom',
            startPlug: 'behind',
            endPlug: 'arrow1',
          }
        );
      }
    }, 100);
  }
  ngOnDestroy() {
    if (this.line) {
      this.line.remove();
    }
  }
}
