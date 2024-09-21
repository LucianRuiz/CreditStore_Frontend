import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserReq } from '../models/user-req';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginReq } from '../models/login-req';
import { Login } from '../models/login';
import { User } from '../../auth/models/user';
import { Payment } from '../../payments/model/pay';
const injector = Injector.create({
  providers: [
    { provide: HttpClient, deps: [], useClass: HttpClientModule },
  ],
});
@Injectable({
  providedIn: 'root'


})
export class UserService {

  apiUrl: string = environment.baseUrl+'/users';
  constructor(public http: HttpClient) {}

  createUser(userReq: UserReq): Observable<string> {
    return this.http.post<string>(this.apiUrl, userReq);
  }

  //TODO: Actualizar para que solo devuelva el string del ID
  logIn(req: LoginReq):Observable<Login>{
    return this.http.post<Login>(this.apiUrl + '/login', req);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }

  
}
