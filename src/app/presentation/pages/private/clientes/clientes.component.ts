import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/ui/input';
import { ButtonComponent } from '../../../shared/ui/button';
import {
  Dot,
  Key,
  ListFilter,
  LucideAngularModule,
  Pencil,
  Plus,
  SlidersHorizontal,
  Trash2,
} from 'lucide-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { ClientService } from '@app/infraestructure/services/client.service';
import { StatusCellRenderer } from '@app/presentation/shared/ui/status';
import { ActionsCellRenderer } from '@app/presentation/shared/ui/actions';
@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    InputComponent,
    ButtonComponent,
    LucideAngularModule,
    AgGridAngular,
    ActionsCellRenderer,
  ],
  providers: [ClientService],
})
export class ClientesCompoent implements OnInit {
  readonly Plus = Plus;
  readonly ListFilter = ListFilter;
  readonly SlidersHorizontal = SlidersHorizontal;

  private clientService = inject(ClientService);
  rowData: any[] = [];
  ngOnInit(): void {
    this.loadClioents();
  }
  loadClioents() {
    this.clientService.request('GET v1/api/client').subscribe({
      next: (response) => {
        this.rowData = response.data;
        console.log(response);
      },
    });
  }
  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };
  columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
    },
    { field: 'description', headerName: 'Descripción' },
    { field: 'client_id', headerName: 'Client ID' },
    { field: 'domain', headerName: 'Dominio' },
    {
      field: 'Status',
      headerName: 'Estado',
      cellRenderer: StatusCellRenderer,
    },
    {
      field: 'oAuthClientScopePermission',
      headerName: 'Scopes',
      valueFormatter: (params) => {
        return params.value
          ?.map((permission: any) => permission.scope.name)
          .join(', ');
      },
    },
    {
      field: 'created_at',
      headerName: 'Fecha Creación',
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      headerName: 'Acciones',
      field: 'actions',
      sortable: false,
      filter: false,
      cellRenderer: ActionsCellRenderer,
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };
  context = { componentParent: this };
  onEdit(client: any) {
    console.log('Edit client:', client);
  }

  onResetKey(client: any) {
    console.log('Reset key for client:', client);
  }

  onDelete(client: any) {
    console.log('Delete client:', client);
  }

  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    console.log('Selected rows:', selectedRows);
  }
}
