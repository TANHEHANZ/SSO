import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/ui/input';
import { ButtonComponent } from '../../../shared/ui/button';
import {
  ListFilter,
  LucideAngularModule,
  Plus,
  SlidersHorizontal,
} from 'lucide-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { ClientService } from '@app/infraestructure/services/client.service';
import { StatusCellRenderer } from '@app/presentation/shared/ui/status';
import { ActionsCellRenderer } from '@app/presentation/shared/ui/actions';
import ApexCharts from 'apexcharts';

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
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    `,
  ],
})
export class ClientesCompoent implements OnInit {
  readonly Plus = Plus;
  readonly ListFilter = ListFilter;
  readonly SlidersHorizontal = SlidersHorizontal;

  private clientService = inject(ClientService);
  rowData: any[] = [];
  ngOnInit(): void {
    this.loadClioents();
    this.initializeChart();
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
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };
  initializeChart(): void {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
      },
      series: [
        {
          name: 'Clients',
          data: [10, 20, 30, 40, 50],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
    };

    const chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  }
}
