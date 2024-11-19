import { Injectable } from '@angular/core';
import axios from 'axios'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionLoginService {

  constructor() { }

  async loginUser(data: any): Promise<any> {
    try {
      const response = await axios({
        url: environment.url + 'login/',
        method: 'POST',
        data: data
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async registerUser(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'register/',
        method: 'POST',
        data: data
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
  async logout(token: any): Promise<any> {
    try { 
      const response = await axios({
        url: environment.url + "logout/",
        method: 'get',
        headers: {
          'Authorization': 'Token ' + token
        }
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
    
  }
  async getUser(token: any): Promise<any> {
    try {
      const response = await axios({
        url: environment.url + "get-user/",
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + token
        }
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
}
