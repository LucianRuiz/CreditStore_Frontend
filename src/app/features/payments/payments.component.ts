import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Payment } from './model/pay';
import { paymentService } from './service/payment.service';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from "../../public/components/navbar/navbar.component";
import { AddPaymentComponent } from '../credits/components/add-payment/add-payment.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de importar ReactiveFormsModule
    NgForOf,
    NavbarComponent,
    NgbModalModule,
    AddPaymentComponent,SlicePipe // Asegúrate de importar NgbModalModule
  ]
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  accountId: string = "";
  clientId:string ="";
  startDate: string = "";
  endDate: string = "";

  constructor(
    private paymentService: paymentService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal
  ){}

  ngOnInit() {
    this.accountId = this.sessionStorageService.getItem('accountId');
    this.clientId = this.sessionStorageService.getItem('clientId')
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getpaysofaccount(this.accountId).subscribe(
      (response: Payment[]) => {
        this.payments = response;
        this.filteredPayments = response;
      });
  }



  filterPayments() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.filteredPayments = this.payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= start && paymentDate <= end;
      });
    } else {
      this.filteredPayments = this.payments; // Mostrar todos los pagos si no hay filtros
    }
  }

  openAddPaymentModal(): void {
    this.paymentService.getDeudaMes(this.accountId).subscribe(client => {
      const modalRef = this.modalService.open(AddPaymentComponent);
      modalRef.componentInstance.accountId = this.accountId;
      modalRef.result.then((result: any) => {
        if (result) {
          console.log('Modal cerrado con éxito');
          this.getPayments(); // Recargar los pagos después de añadir uno nuevo
        }
      }).catch((error: any) => {
        console.log('Modal cerrado con error', error);
      });
    });
  }
}
