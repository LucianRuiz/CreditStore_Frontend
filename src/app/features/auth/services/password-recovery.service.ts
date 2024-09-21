import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {ChangePasswordReqModel} from "../models/change-password-req.model";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  verifyEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/verify-mail/${email}`, '', { responseType: 'text' as 'json' });
  }

  verifyOtp(otp: number, email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/verify/${otp}/${email}`, '', { responseType: 'text' as 'json' });
  }

  changePassword(email: string, changePasswordReq: ChangePasswordReqModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/change-password/${email}`, changePasswordReq, { responseType: 'text' as 'json' });
  }


}
