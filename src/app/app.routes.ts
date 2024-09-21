import { Routes } from '@angular/router';
import { TheLoginPageComponent } from './features/auth/pages/the-login-page/the-login-page.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { AddPaymentComponent } from './features/credits/components/add-payment/add-payment.component';
import { TheCreateAccountComponent } from './features/auth/pages/the-create-account/the-create-account.component';
import { MonthlyIncomeComponent } from './features/home/pages/monthly-income/monthly-income.component';
import { RecoverPasswordPageComponent } from './features/auth/pages/recover-password-page/recover-password-page.component';
import { CreateNewPasswordPageComponent } from './features/auth/pages/create-new-password-page/create-new-password-page.component';
import { RecoverCodePageComponent } from './features/auth/pages/recover-code-page/recover-code-page.component';

import { AddAccountPageComponent } from './features/account/pages/add-account-page/add-account-page.component';
import { ClientPageComponent } from './features/clients/pages/client-page/client-page.component';
import { ChangeProfileComponent } from './features/auth/components/change-profile/change-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { PaymentsComponent } from './features/payments/payments.component';
import { TheCreditAccountListPagePerClientComponent } from './features/account/pages/the-credit-account-list-page-per-client/the-credit-account-list-page-per-client.component';
import { PlanPagosComponent } from './features/plan-pagos/plan-pagos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: TheLoginPageComponent },
  { path: 'panel', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientPageComponent, canActivate: [AuthGuard] },
  { path: 'recover-code', component: RecoverCodePageComponent },
  { path: 'change-password', component: CreateNewPasswordPageComponent },
  { path: 'recover-password', component: RecoverPasswordPageComponent },
  { path: 'create-password', component: CreateNewPasswordPageComponent },
  { path: 'add-payment', component: AddPaymentComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: TheCreateAccountComponent },

  { path: 'add-account', component: AddAccountPageComponent, canActivate: [AuthGuard] },
  { path: 'change-profile', component: ChangeProfileComponent, canActivate: [AuthGuard] },

  { path: 'add-account', component: AddAccountPageComponent },
  { path: 'change-profile', component: ChangeProfileComponent },
  { path: 'credit-list-client', component: TheCreditAccountListPagePerClientComponent },
  { path: 'add-account', component: AddAccountPageComponent, canActivate: [AuthGuard] },
  { path: 'change-profile', component: ChangeProfileComponent, canActivate: [AuthGuard] },
  { path: 'montlyincome', component: MonthlyIncomeComponent },
  { path: 'createAccount', component: TheCreateAccountComponent },

  { path: 'payments', component: PaymentsComponent },
  { path: 'plan-pagos', component: PlanPagosComponent },
];
