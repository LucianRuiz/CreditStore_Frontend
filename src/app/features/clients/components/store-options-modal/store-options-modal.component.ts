import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-options-modal',
  templateUrl: './store-options-modal.component.html',
  styleUrls: ['./store-options-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class StoreOptionsModalComponent {
  interestRate: string = '12%';
  cokValue: string = '';

  constructor(public dialogRef: MatDialogRef<StoreOptionsModalComponent>) {}

  save(): void {
    this.formatInterestRate();
    console.log(`Tasa de interés moratoria: ${this.interestRate}`);
    console.log(`Valor COK: ${this.cokValue}`);
    this.dialogRef.close();
  }

  formatInterestRate(): void {
    if (!this.interestRate.includes('%')) {
      this.interestRate = `${this.interestRate}%`;
    }
  }

  validateCokValue(): void {
    const numericValue = parseFloat(this.cokValue);
    if (isNaN(numericValue)) {
      this.cokValue = '';
    } else {
      this.cokValue = numericValue.toString();
    }
  }
}
