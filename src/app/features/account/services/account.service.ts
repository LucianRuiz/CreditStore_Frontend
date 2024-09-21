import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountRequest } from '../models/account-request.model';
import { AccountResponse } from '../models/account-response.model';
import { Account } from '../models/account.model';
import { AccountQuery } from '../models/account-query';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createAccount(accountRequest: AccountRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts`, accountRequest);
  }
  getAllAccountsByUser(userId: string): Observable<AccountQuery[]> {
    return this.http.get<AccountQuery[]>(`${this.apiUrl}/users/${userId}/accounts`);
  }

  getaccountsbyClient(id: string): Observable<AccountResponse[]>{
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/accounts/clients/${id}/accounts`);
  }
}