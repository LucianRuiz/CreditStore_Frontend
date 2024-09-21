import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';
import { NumericInputDirective } from '../../../../shared/directives/numeric-input.directive';
import { NgSelectComponent, NgSelectModule, NgOptionComponent } from '@ng-select/ng-select';
import { ClientService } from '../../services/client.service';
import { ClientReq } from '../../models/client-req';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

@Component({
  selector: 'app-form-client-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FieldErrorComponent, NumericInputDirective, NgSelectModule,],
  providers: [NgSelectComponent, NgOptionComponent],
  templateUrl: './form-client-account.component.html',
  styleUrl: './form-client-account.component.css'
})
export class FormClientAccountComponent implements OnInit {
  userId: string = '';
  paymentDays: number[] = [5, 10, 15, 20, 25];
  form = this.formBuilder.group({
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    dni: new FormControl<string>('', [Validators.required,]),
    birthDate: new FormControl<Date | null>(null, Validators.required),
    address: new FormControl<string>(''),
    creditLine: new FormControl<number | null>(null, Validators.required)
  });

  constructor(
    private formBuilder: FormBuilder,
    public modalService: NgbActiveModal,
    private clientService: ClientService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.sessionStorageService.getItem('userId');
    if (!this.userId) {
      this.toastr.error('No se encontró el userId en el session storage');
    }
  }

  onSave(): void {
    if (this.userId) {
      this.clientService.createClient(this.userId, this.form.value as ClientReq).subscribe({
        next: (id) => {
          console.log(id);
          this.toastr.success('Cliente creado correctamente');
          this.modalService.close(true);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      });
    } else {
      this.toastr.error('No se encontró el userId en el session storage');
    }
  }
}
