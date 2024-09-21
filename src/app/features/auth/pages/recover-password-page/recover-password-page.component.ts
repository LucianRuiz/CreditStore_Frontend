import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LogoScreenComponent } from "../../../../public/components/logo-screen/logo-screen.component";
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../../services/email.service';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';

@Component({
  selector: 'app-recover-password-page',
  standalone: true,
  imports: [LogoScreenComponent, CommonModule, ReactiveFormsModule, FieldErrorComponent],
  templateUrl: './recover-password-page.component.html',
  styleUrls: ['./recover-password-page.component.css']
})
export class RecoverPasswordPageComponent {

  hide: boolean = true;
  form: FormGroup;

  constructor(
    private passwordRecoveryService: PasswordRecoveryService,
    private emailService: EmailService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]), 
    });
  }

  verifyEmail() {
    const emailValue = this.form.get('email')?.value;
    console.log('Correo electrónico extraído del formulario:', emailValue);

    if (!emailValue) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    this.emailService.setEmail(emailValue);
    console.log('Correo electrónico guardado en el servicio:', emailValue);

    this.passwordRecoveryService.verifyEmail(emailValue).subscribe(
      response => {
        this.toastr.success('Correo electrónico verificado');       
        this.router.navigate(['/recover-code']);
      },
      error => {
        console.error('Error al verificar el correo electrónico', error);
        if (error.status === 0) {
          this.toastr.error('No se pudo conectar con el servidor. Por favor, intente más tarde.');
        } else if (error.status === 404) {
          this.toastr.error('Endpoint no encontrado. Verifique la URL del backend.');
        } else {
          this.toastr.error('Error al verificar el correo electrónico');
        }
      }
    );
  }
}
