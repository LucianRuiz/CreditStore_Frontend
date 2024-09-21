import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientQuery } from '../models/client-query';
import { environment } from '../../../../environments/environment';
import { ClientReq } from '../models/client-req';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createClient(userId: string, client: ClientReq): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/clients`, client);
  }

  getAllClientsByUser(userId: string): Observable<ClientQuery[]> {
    return this.http.get<ClientQuery[]>(`${this.apiUrl}/users/${userId}/clients`);
  }

  getAllBiggestDebtorsByUser(userId: string): Observable<ClientQuery[]> {
    return this.http.get<ClientQuery[]>(`${this.apiUrl}/users/${userId}/clients/debtors`);
  }

}
