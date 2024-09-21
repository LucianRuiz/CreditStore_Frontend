import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from '../model/responseData.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) { }

  getAccountById(id: number): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.baseUrl}/${id}`);
  }
}
