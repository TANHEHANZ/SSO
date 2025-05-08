import { Component, inject, OnInit } from '@angular/core';
import {
  ListFilter,
  LucideAngularModule,
  Plus,
  SlidersHorizontal,
} from 'lucide-angular';
import { ClientService } from '@app/infraestructure/services/client.service';
import { colors } from '@app/infraestructure/config/constants';
import { ColumnDef } from '@tanstack/angular-table';
import { ClientResponseDTO } from '@app/infraestructure/models/client/response';
import { ToastService } from '@app/infraestructure/lib/toast/toast.service';
import ApexCharts from 'apexcharts';
import { WraperComponent } from '../../../../../shared/components/wraper.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [LucideAngularModule, WraperComponent, TableComponent],
  providers: [ClientService],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class ClientesCompoent implements OnInit {
  readonly Plus = Plus;
  readonly ListFilter = ListFilter;
  readonly SlidersHorizontal = SlidersHorizontal;
  color: string = colors[1];
  currentPage = 1;
  totalPages = 1;
  totalRows = 0;
  pageSize = 5;
  private clientS = inject(ClientService);
  private toastS = inject(ToastService);
  ngOnInit(): void {
    this.loadClioents();
    this.initializeChart();
  }
  loadClioents() {
    this.clientS.getClients().subscribe({
      next: (value) => {
        this.rowData = value;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.toastS.addToast({
          title: 'Error',
          description: 'Error al traer la informacion del cliente',
          id: 'client-error',
          type: 'error',
        });
      },
    });
  }

  rowData: ClientResponseDTO[] = [];
  columns: ColumnDef<ClientResponseDTO>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'client_id',
      header: 'Client ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'domain',
      header: 'Dominio',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'Status',
      header: 'Estado',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'created_at',
      header: 'Fecha Creación',
      cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
    },
  ];
  handleEdit(clients: ClientResponseDTO[]) {
    const client = clients[0];
    console.log('Editing client:', client);
  }

  handleView(client: ClientResponseDTO) {
    console.log('Viewing client details:', client);
  }

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
