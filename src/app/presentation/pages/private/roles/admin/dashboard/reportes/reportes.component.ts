import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { colors } from '@app/infraestructure/config/constants';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent {
  color: string = colors[0];
}
