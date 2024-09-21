
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.baseUrl; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  getInterest(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/interest`);
  }

  getClientesConMayoresDeudas(userId: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/users/${userId}/clients/debtors`);
  }

}
