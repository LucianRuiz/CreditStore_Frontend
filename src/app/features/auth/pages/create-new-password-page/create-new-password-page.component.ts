import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoScreenComponent } from "../../../../public/components/logo-screen/logo-screen.component";
import { Router } from "@angular/router";
import { ChangePasswordReqModel } from '../../models/change-password-req.model';
import { EmailService } from '../../services/email.service';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error.component';
import { UserService } from '../../../clients/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

@Component({
  selector: 'app-create-new-password-page',
  standalone: true,
  imports: [
    LogoScreenComponent, CommonModule, ReactiveFormsModule, FieldErrorComponent
  ],
  templateUrl: './create-new-password-page.component.html',
  styleUrls: ['./create-new-password-page.component.css']
})
export class CreateNewPasswordPageComponent implements OnInit {
  newPassword: string = '';
  email: string = '';
  hide: boolean = true;
  form = this.formBuilder.group({
    password: new FormControl('', Validators.required),
  });

  constructor(
    private passwordRecoveryService: PasswordRecoveryService,
    private emailService: EmailService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }
  ngOnInit(): void {
    this.email = this.emailService.getEmail();
    if(!this.email){
      this.router.navigate(['/recover-password']);
    }
  }

  changePassword() {
    this.newPassword = this.form.controls.password.value!;
    const changePasswordReq = {
      password: this.newPassword,
      newPassword: this.newPassword
    };

    this.passwordRecoveryService.changePassword(this.email, changePasswordReq as ChangePasswordReqModel).subscribe(
      {
        next: (res) => {
          this.toastr.success('Contraseña cambiada con éxito!');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

}
