import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authEndPoints } from '../auth.endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(data: FormData): any{
    return this.httpClient.post<any>(authEndPoints.login,data);
  }

  register(data: FormData): any{
    return this.httpClient.post<any>(authEndPoints.register,data);
  }

}
