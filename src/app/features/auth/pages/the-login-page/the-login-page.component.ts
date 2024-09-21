import { Component } from '@angular/core';
import { LogoScreenComponent } from '../../../../public/components/logo-screen/logo-screen.component';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../clients/services/user.service';
import { UserReq } from '../../../clients/models/user-req';
import { finalize } from 'rxjs';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

@Component({
  selector: 'app-the-login-page',
  standalone: true,
  imports: [
    LogoScreenComponent, CommonModule, ReactiveFormsModule, FieldErrorComponent
  ],
  templateUrl: './the-login-page.component.html',
  styleUrl: './the-login-page.component.css'
})
export class TheLoginPageComponent {
  hide: boolean = true;
  spinner: boolean = false;
  form = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSave(): void {
    this.spinner = true;
    this.userService.logIn(this.form.getRawValue() as UserReq).pipe(finalize(() => this.spinner = false))
      .subscribe({
        next: (res) => {
          this.toastr.success('Bienvenido!');
          console.log(res);
          this.sessionStorageService.setItem('userId', res);
          this.navigateToDashboard();
        },
        error: err => {
          this.toastr.error(err.error.message)
        }
      });
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }

  navigateToCreateAccount() {
    this.router.navigate(['/create-account']);
  }

  navigateToChangePassword() {
    this.router.navigate(['/recover-password']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/panel']);
  }
}
