import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { paymentService } from '../../../payments/service/payment.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  @Input() accountId!: string;

  form = this.formBuilder.group({
    paymentDate: [this.getToday(), Validators.required],
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
  });

  totalDebt!: number;

  constructor(
    private formBuilder: FormBuilder,
    public modalService: NgbActiveModal,
    private toastr: ToastrService,
    private http: HttpClient,
    private paymentService: paymentService
  ) { }

  ngOnInit(): void {
    if (!this.accountId) {
      console.error('accountId is null or undefined');
      this.toastr.error('Error: accountId no está definido');
      return;
    }

    this.paymentService.getDeudaMes(this.accountId).subscribe({
      next: (response) => {
        console.log(response);
        this.totalDebt = response;
        this.form.get('amount')?.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(this.totalDebt)
        ]);
        this.form.get('amount')?.updateValueAndValidity();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al obtener la deuda');
      }
    });
  }

  onSave(): void {
    if (this.form.valid) {
      let paymentDate: string | null = this.form.value.paymentDate
        ? new Date(this.form.value.paymentDate).toISOString().split('T')[0]
        : null;

      console.log('Converted paymentDate value:', paymentDate);

      const paymentAmount = this.form.value.amount;

      if (paymentAmount && paymentAmount > this.totalDebt) {
        this.toastr.error('El pago no puede ser mayor que la deuda total');
        return;
      }

      const paymentData = {
        amount: paymentAmount,
        date: paymentDate
      };

      console.log('Payment data to be sent:', paymentData);

      if (!this.accountId) {
        console.error('accountId is null or undefined');
        this.toastr.error('Error: accountId no está definido');
        return;
      }

      this.http.post(`http://localhost:8080/accounts/${this.accountId}/pays`, paymentData).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Pago agregado correctamente');
          this.updateTotalDebt();
          this.modalService.close(true);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error al agregar el pago');
        }
      });
    } else {
      this.toastr.error('Por favor, completa todos los campos requeridos correctamente');
    }
  }

  updateTotalDebt(): void {
    if (!this.accountId) {
      console.error('accountId is null or undefined');
      this.toastr.error('Error: accountId no está definido');
      return;
    }

    this.paymentService.getDeudaMes(this.accountId).subscribe({
      next: (response) => {
        console.log(response);
        this.totalDebt = response;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al obtener la deuda');
      }
    });
  }

  private getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
