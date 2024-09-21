import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Payment } from '../../payments/model/pay';
import { ClientQuery } from '../../clients/models/client-query';
const injector = Injector.create({
  providers: [
    { provide: HttpClient, deps: [], useClass: HttpClientModule },
  ],
});
@Injectable({
  providedIn: 'root'


})
export class paymentService {

  apiUrl: string = environment.baseUrl;
  constructor(public http: HttpClient) {}

  getpaysofaccount(id: string): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.apiUrl}/accounts/${id}/pays`);
  }

  getDeudaMes(accountId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/accounts/${accountId}/credit-debt`);
  }
}
