import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserData } from '../interfaces/user-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userToken: BehaviorSubject<any> = new BehaviorSubject(null);

  setUserToken() {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.userToken.next(token);
    }
  }

  setRegister(userInfo: UserData): Observable<any> {
    return this._HttpClient.post(environment.baseURL + 'signUp', userInfo);
  }

  setLogin(userInfo: UserData): Observable<any> {
    return this._HttpClient.post(environment.baseURL + 'signIn', userInfo);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/signin']);
  }
}
