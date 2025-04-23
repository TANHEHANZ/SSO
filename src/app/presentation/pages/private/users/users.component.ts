import { Component } from '@angular/core';
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
@Component({
  selector: 'app-users',
  imports: [
    ButtonComponent,
    LucideAngularModule,
    InputComponent,
    AgGridAngular,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  readonly Plus = Plus;
  readonly ListFilter = ListFilter;
  readonly SlidersHorizontal = SlidersHorizontal;
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
