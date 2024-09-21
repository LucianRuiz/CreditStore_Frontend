import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { NavbarComponent } from './public/components/navbar/navbar.component';
import { TheLoginPageComponent } from './features/auth/pages/the-login-page/the-login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MonthlyIncomeComponent } from './features/home/pages/monthly-income/monthly-income.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TheLoginPageComponent, NavbarComponent, HttpClientModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CreditStore-FrontEnd';
}
