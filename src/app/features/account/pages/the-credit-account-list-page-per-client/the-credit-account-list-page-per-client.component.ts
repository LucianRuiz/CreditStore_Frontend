import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../public/components/navbar/navbar.component';
import { DatePipe, NgForOf, SlicePipe } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { AccountResponse } from '../../models/account-response.model';
import { Router } from '@angular/router';
import { ClientService } from '../../../clients/services/client.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ClientQuery } from '../../../clients/models/client-query';
@Component({
  selector: 'app-the-credit-account-list-page-per-client',
  standalone: true,
  imports: [
      NavbarComponent,
      SlicePipe,
      DatePipe,
      NgForOf,
      CommonModule

  ],
  templateUrl: './the-credit-account-list-page-per-client.component.html',
  styleUrl: './the-credit-account-list-page-per-client.component.css'
})
export class TheCreditAccountListPagePerClientComponent {
  userId?: string;
  accounts: AccountResponse[] = [];
  clientsId: string = ''; // Reemplaza con el ID del usuario actual
  nombre: string="";
  clients: ClientQuery[] = [];

  constructor(
    private accountService: AccountService,
    private sessionStorageService: SessionStorageService,
    private router:Router,
    private clientService: ClientService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.sessionStorageService.getItem('userId');
    this.clientsId = this.sessionStorageService.getItem('clientsId');
    this.nombre = this.sessionStorageService.getItem('clientsName');
    this.getAllAccounts();
    this.getClientByUserId();
  }

  getClientByUserId() {
    this.clientService.getAllClientsByUser(this.userId!).subscribe(
      {
        next: (response) => {
          this.clients = response;
          this.clients = this.clients.filter((client) => client.id === this.clientsId);
          console.log('Clientes recibidos:', this.clients);
        },
        error: (error) => {
          console.error('Error al obtener los clientes', error);
        }
      }
    );
  }

  getAllAccounts() {
    this.accountService.getaccountsbyClient(this.clientsId).subscribe(
      (response: AccountResponse[]) => {
        this.accounts = response;
        console.log('cuentas recibidos:', this.accounts);
      },
      (error) => {
        console.error('Error al obtener las cuentas', error);
      }
    );
  }
  verpagos(accountId: number) {
    this.sessionStorageService.setItem("accountId",accountId);
    this.router.navigate(['payments']);
  }

  createcredit() {
    if(this.clients[0].tieneMora){
      this.toastrService.error('No se puede crear una cuenta si el cliente tiene mora, por favor proceda a hacer el pago de la deuda pendiente.');
      return;
    }
    this.router.navigate(['add-account']);
  }

  planpagos(accountId: number) {
    this.sessionStorageService.setItem("accountId",accountId);
    this.router.navigate(['plan-pagos']);
  }

  capitalizacionText(valor: number): string {
    switch (valor) {
      case 1:
        return 'Diario';
      case 30:
        return 'Mensual';
      case 360:
        return 'Anual';
      default:
        return valor.toString();
    }
  }
}
