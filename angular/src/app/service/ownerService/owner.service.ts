import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private userInterfaceBehaviour: UserInterfaceBehaviour) { }

  async getOwners() {
    try {
      const response = await axios({
        url: environment.url + 'owners',
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

  async createOwner(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'owners',
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

  async updateOwner(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'owners/'+data.id,
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
  async deleteOwner(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'owners/' + data.id,
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
