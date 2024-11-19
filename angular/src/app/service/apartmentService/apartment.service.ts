import { Injectable } from '@angular/core';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private userInterfaceBehaviour: UserInterfaceBehaviour) { }

  async getApartments() {
    try {
      const response = await axios({
        url: environment.url + 'apartments',
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

  async createApartment(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'apartments',
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

  async updateApartment(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'apartments/'+data.id,
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
  async deleteApartment(data: any) {
    try {
      const response = await axios({
        url: environment.url + 'apartments/' + data.id,
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
