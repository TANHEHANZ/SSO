import { Component, inject, OnInit } from '@angular/core';
import { ColorService } from '../../../../../infraestructure/global/colors.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
  color: string = '#000'; // Color predeterminado
  private colorService = inject(ColorService);

  ngOnInit(): void {
    // Suscríbete al observable para obtener el color actual
    this.colorService.color$.subscribe((color) => {
      this.color = color;
      console.log('Color actualizado:', this.color);
    });
  }
}
