import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button';
import {
  ListFilter,
  LucideAngularModule,
  Plus,
  SlidersHorizontal,
} from 'lucide-angular';
import { InputComponent } from '../../../shared/ui/input';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { ColorService } from '../../../../infraestructure/global/colors.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users',
  imports: [
    ButtonComponent,
    LucideAngularModule,
    InputComponent,
    AgGridAngular,
    CommonModule,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  readonly Plus = Plus;
  readonly ListFilter = ListFilter;
  readonly SlidersHorizontal = SlidersHorizontal;
  color = '#000';
  title = 'Usuarios';
  private colorSubscription!: Subscription;
  colorS = inject(ColorService);

  ngOnInit(): void {
    this.colorSubscription = this.colorS.color$.subscribe((color) => {
      this.color = color;
      console.log('color', this.color);
    });
  }

  ngOnDestroy(): void {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Nombre' },
    { field: 'email', headerName: 'Correo' },
    { field: 'role', headerName: 'Rol' },
    { field: 'status', headerName: 'Estado' },
  ];

  rowData = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    console.log('Selected rows:', selectedRows);
  }
}
