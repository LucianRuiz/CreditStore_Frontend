import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LogoScreenComponent } from '../../../../public/components/logo-screen/logo-screen.component';
import { UserReq } from '../../../clients/models/user-req';
import { UserService } from '../../../clients/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-the-create-account',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    LogoScreenComponent,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './the-create-account.component.html',
  styleUrls: ['./the-create-account.component.css'],
  providers: [HttpClientModule, UserService]
})
export class TheCreateAccountComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  passwordUpperCaseValid = false;
  passwordSpecialCharValid = false;
  passwordNumberValid = false;
  passwordLowerCaseValid = false;
  passwordsMatch = false;
  passwordNeutral = true;
  spinner = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, this.noNumbersValidator()]],
      lastName: ['', [Validators.required, this.noNumbersValidator()]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
      storeName: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.registerForm.valueChanges.subscribe(() => {
      this.updatePasswordRequirements();
      this.updatePasswordMatch();
    });
  }

  ngOnInit(): void {}

  noNumbersValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return /\d/.test(value) ? { noNumbers: 'El nombre no debe contener números' } : null;
    };
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);

      this.passwordNeutral = false;
      this.passwordUpperCaseValid = hasUpperCase;
      this.passwordNumberValid = hasNumber;
      this.passwordSpecialCharValid = hasSpecialChar;
      this.passwordLowerCaseValid = hasLowerCase;

      const valid = hasUpperCase && hasNumber && hasSpecialChar && hasLowerCase;
      return !valid ? { passwordStrength: 'La contraseña debe contener mayúsculas, minúsculas, un número y un carácter especial' } : null;
    };
  }

  passwordMatchValidator = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
    return !this.passwordsMatch ? { passwordsDoNotMatch: 'Las contraseñas no coinciden' } : null;
  }

  updatePasswordMatch(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.spinner = true;
      this.userService.createUser(this.registerForm.getRawValue() as UserReq).pipe(finalize(() => this.spinner = false))
        .subscribe({
          next: id => {
            this.toastr.success('¡Usuario creado correctamente!');
            this.registerForm.reset();
            this.router.navigate(['panel']);
          },
          error: error => {
            this.toastr.error(error.error.message);
          }
        });
    } else {
      this.displayErrors();
    }
  }

  displayErrors(): void {
    if (this.registerForm.get('name')?.hasError('noNumbers')) {
      this.toastr.error('El nombre no debe contener números.');
    } else if (this.registerForm.get('lastName')?.hasError('noNumbers')) {
      this.toastr.error('El apellido no debe contener números.');
    } else if (this.registerForm.get('dni')?.hasError('pattern')) {
      this.toastr.error('El DNI debe tener exactamente 8 dígitos.');
    } else if (this.registerForm.get('email')?.hasError('email')) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido.');
    } else if (this.registerForm.get('password')?.hasError('passwordStrength')) {
      this.toastr.error('La contraseña debe contener mayúsculas, minúsculas, un número y un carácter especial.');
    } else if (this.registerForm.get('password')?.hasError('minlength')) {
      this.toastr.error('La contraseña debe tener al menos 8 caracteres.');
    } else if (this.registerForm.hasError('passwordsDoNotMatch')) {
      this.toastr.error('Las contraseñas no coinciden.');
    } else {
      this.toastr.error('Por favor, complete correctamente el formulario.');
    }
  }
  
  updatePasswordRequirements(): void {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl) {
      passwordControl.updateValueAndValidity({ onlySelf: true });
    }
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl) {
      confirmPasswordControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  navigateToInicio() {
    this.router.navigate(['login']);
  }
}
