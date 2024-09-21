import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountRequest } from '../../models/account-request.model';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';
import { NavbarComponent } from "../../../../public/components/navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account-page',
  templateUrl: './add-account-page.component.html',
  styleUrls: ['./add-account-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    NgSelectModule,
    FieldErrorComponent,
    NavbarComponent
  ]
})
export class AddAccountPageComponent implements OnInit {
  AccountRequest: AccountRequest = {
    valorCompra: 0,
    tipoTasa: '',
    capitalizacionTasa: 0,
    valorTasa: 0,
    tipoCredito: '',
    numeroCuotas: 0,
    plazoGracia: '',
    periodoGracia: 0,
    tasaMoratoria: 0,
    diasAtraso: 0,
    limiteCredito: 0,
    tiempoTasa: 0,
    paymentDate: new Date('2024-07-01'),
    clientId: ''
  };

  capitalizationTasaOptions = [
    { value: 360, viewValue: 'Anual' },
    { value: 30, viewValue: 'Mensual' },
    { value: 1, viewValue: 'Diaria' }
  ];

  interestTypes = ['EFECTIVA', 'NOMINAL'];
  creditType = ['VENCIMIENTO', 'MENSUAL'];
  gracePeriod = [
    { value: 'T', viewValue: 'Total' },
    { value: 'P', viewValue: 'Parcial' },
    { value: 'S', viewValue: 'Sin Plazo' },
  ];

  sharesNumber = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' },
    { value: 11, viewValue: '11' },
    { value: 12, viewValue: '12' }
  ];

  gracePeriodLength = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' }
  ];

  tiempoTasaOptions = [
    { value: 30, viewValue: 'Mensual' },
    { value: 60, viewValue: 'Bimestral' },
    { value: 120, viewValue: 'Cuatrimestral' },
    { value: 180, viewValue: 'Semestral' },
    { value: 360, viewValue: 'Anual' }
  ];

  formCredit: FormGroup;
  clientsId: string = "";

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formCredit = this.formBuilder.group({
      purchaseValue: new FormControl<null|number>(null, [Validators.required, Validators.min(1)]),
      interestType: new FormControl('NOMINAL', Validators.required),
      capitalizationPeriod: new FormControl(30, Validators.required),
      interestRate: new FormControl<null | number>(null, [Validators.required, Validators.min(0)]),
      tasaMoratoria: new FormControl<null | number>(null, [Validators.required, Validators.min(0)]),
      creditType: new FormControl('MENSUAL', Validators.required),
      sharesNumber: new FormControl(1, [Validators.required, Validators.min(1)]),
      gracePeriod: new FormControl('S', Validators.required),
      gracePeriodLength: new FormControl(0, Validators.required),
      tiempoTasa: new FormControl(30, Validators.required),
      paymentDate: new FormControl(new Date())
    });


    // Establecer el estado inicial para 'Periodo(s) de Gracia'
    this.changePeriodoGracia(this.formCredit.value.gracePeriod);
  }

  ngOnInit() {
    this.clientsId = this.sessionStorageService.getItem('clientsId');
    console.log(this.clientsId);
    this.changePeriodoGracia(this.formCredit.value.gracePeriod);
  }

  onSubmit() {

    if (this.formCredit.valid) {
      this.AccountRequest = {
        valorCompra: this.formCredit.value.purchaseValue ?? 0,
        tipoTasa: this.formCredit.value.interestType ?? '',
        capitalizacionTasa: this.formCredit.value.capitalizationPeriod ?? 1,
        valorTasa: (this.formCredit.value.interestRate ?? 0),
        tipoCredito: this.formCredit.controls['creditType'].value ?? '',
        numeroCuotas: this.formCredit.value.sharesNumber ?? 0,
        plazoGracia: this.formCredit.value.gracePeriod ?? '',
        periodoGracia: this.formCredit.value.gracePeriodLength ?? 0,
        tasaMoratoria: (this.formCredit.value.tasaMoratoria ?? 0),
        diasAtraso: 0,
        limiteCredito: 0,
        tiempoTasa: this.formCredit.value.tiempoTasa ?? 0,
        paymentDate: this.formCredit.value.paymentDate,
        clientId: this.clientsId
      };

      console.log(this.AccountRequest);

      this.accountService.createAccount(this.AccountRequest).subscribe(
        response => {
          this.toastr.success('Credito creado exitosamente');
          this.router.navigate(['/credit-list-client']);
        },
        error => {
          this.toastr.error(error.error.message);
        }
      );
    } else {
      this.toastr.error('Por favor, completa todos los campos requeridos.');
    }
  }

  changeTipoTasa(tasa: string): void {
    if (tasa === 'EFECTIVA') {
      this.formCredit.controls['capitalizationPeriod'].clearValidators();
      this.formCredit.controls['capitalizationPeriod'].setValue('');
      this.formCredit.controls['capitalizationPeriod'].disable();
    } else {
      this.formCredit.controls['capitalizationPeriod'].enable();
      this.formCredit.controls['capitalizationPeriod'].setValue(30);
      this.formCredit.controls['capitalizationPeriod'].setValidators(Validators.required);
    }
    this.formCredit.controls['capitalizationPeriod'].updateValueAndValidity();
  }

  changeTipoCredito(tipo: string): void {
    if (tipo === 'VENCIMIENTO') {
      this.formCredit.controls['sharesNumber'].clearValidators();
      this.formCredit.controls['sharesNumber'].setValue(1);
      this.formCredit.controls['sharesNumber'].disable();
    } else {
      this.formCredit.controls['sharesNumber'].enable();
      this.formCredit.controls['sharesNumber'].setValue(1);
      this.formCredit.controls['sharesNumber'].setValidators([Validators.required, Validators.min(1)]);
    }
    this.formCredit.controls['sharesNumber'].updateValueAndValidity();
  }

  changePeriodoGracia(gracia: string): void {
    if (gracia === 'S') {
      this.formCredit.controls['gracePeriodLength'].clearValidators();
      this.formCredit.controls['gracePeriodLength'].setValue(0);
      this.formCredit.controls['gracePeriodLength'].disable();
    } else {
      this.formCredit.controls['gracePeriodLength'].enable();
      this.formCredit.controls['gracePeriodLength'].setValue(1);
      this.formCredit.controls['gracePeriodLength'].setValidators(Validators.required);
    }
    this.formCredit.controls['gracePeriodLength'].updateValueAndValidity();
  }
}
