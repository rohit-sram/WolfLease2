import { Injectable } from '@angular/core';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userInterfaceBehaviour: UserInterfaceBehaviour) { }

  async getUsers() {
    try {
      const response = await axios({
        url: environment.url + 'users',
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + this.userInterfaceBehaviour.getToken()
        }
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async createUser(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'users/',
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + this.userInterfaceBehaviour.getToken()
        },
        data: data
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async updateUser(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'users/'+data.id,
        method: 'PUT',
        headers: {
          'Authorization': 'Token ' + this.userInterfaceBehaviour.getToken()
        },
        data: data
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
  async deleteUser(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'users/' + data.id,
        method: 'DELETE',
        headers: {
          'Authorization': 'Token ' + this.userInterfaceBehaviour.getToken()
        },
        data: data
      })
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
}
