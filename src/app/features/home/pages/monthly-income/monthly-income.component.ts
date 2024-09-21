import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Chart, registerables } from 'chart.js';
import { CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { WindowRefService } from '../../../clients/services/window-ref.service'; 
import { StoreOptionsModalComponent } from '../../../clients/components/store-options-modal/store-options-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {NavbarComponent} from "../../../../public/components/navbar/navbar.component";
Chart.register(...registerables);

@Component({
  selector: 'app-monthly-income',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,MatDialogModule,NavbarComponent
  ],
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonthlyIncomeComponent implements AfterViewInit {
  @ViewChild('lineChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  private isBrowser: boolean;

  public lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        data: [1000, 800, 2000, 1500, 1200, 2500, 1800, 2200, 1700, 2000, 1400, 2600],
        label: 'Ganancia',
        fill: false,
        tension: 0,
        pointBackgroundColor: 'green',
        pointBorderColor: 'green'
      },
    ],
  };

  public lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public lineChartType: any = 'line';

  public estadisticas = [
    { icon: 'attach_money', label: 'Ganancias Totales', value: 'S/40,728' },

  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any, private windowRef: WindowRefService,public dialog: MatDialog) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  openDialog(): void {
    this.dialog.open(StoreOptionsModalComponent);
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      new Chart(this.chartRef.nativeElement, {
        type: this.lineChartType,
        data: this.lineChartData,
        options: this.lineChartOptions
      });
    }
  }
  
}
