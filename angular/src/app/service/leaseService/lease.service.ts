import { Injectable } from '@angular/core';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor(private userInterfaceBehaviour: UserInterfaceBehaviour) { }

  async getLeases() {
    try {
      const response = await axios({
        url: environment.url + 'lease',
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

  async createLease(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'lease',
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

  async updateLease(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'lease/'+data.id,
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
  async deleteLease(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'lease/' + data.id,
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
