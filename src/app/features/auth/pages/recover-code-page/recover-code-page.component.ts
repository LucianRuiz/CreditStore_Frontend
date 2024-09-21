import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { EmailService } from "../../services/email.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LogoScreenComponent } from '../../../../public/components/logo-screen/logo-screen.component';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';

@Component({
  selector: 'app-recover-code-page',
  standalone: true,
  imports: [LogoScreenComponent, CommonModule, ReactiveFormsModule, FieldErrorComponent],
  templateUrl: './recover-code-page.component.html',
  styleUrls: ['./recover-code-page.component.css']
  
})
export class RecoverCodePageComponent implements OnInit {
  otp: number = 0;
  email: string = ''; 
  form: FormGroup;
  

  constructor(
    private passwordRecoveryService: PasswordRecoveryService,
    private emailService: EmailService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required, this.numberValidator()]]
    });
  }

  verifyOtp() {
    // Ensure the form is valid before proceeding
    if (this.form.valid) {
      // Retrieve the OTP value from the form
      this.otp = this.form.value.otp;

      // Retrieve the email from the email service
      this.email = this.emailService.getEmail();

      // Call the password recovery service to verify OTP
      this.passwordRecoveryService.verifyOtp(this.otp, this.email).subscribe(
        response => {
          console.log('Código OTP verificado');
          this.toastr.success('Código verificado');
          this.router.navigate(['/change-password']);
        },
        error => {
          console.error('Error al verificar el código OTP', error);
          this.toastr.error('Error al verificar el código OTP');
        }
      );
    }
  }

  ngOnInit(): void {
    // Initialize the email value from the email service
    this.email = this.emailService.getEmail();
    console.log('Correo electrónico obtenido del servicio:', this.email); 
  }

  numberValidator() {
    return (control: any) => {
      return isNaN(control.value) ? {'number': true} : null;
    };
  }
}
