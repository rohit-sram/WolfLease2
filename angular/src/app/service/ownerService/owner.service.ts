import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  async getOwners() {
    try {
      const response = await axios({
        url: environment.url + 'owners',
        method: 'GET',
        headers: {
          'Authorization': 'Token ec32c81fb42148ad70e8ed3bd7f3de4a16819e10'
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
          'Authorization': 'Token ec32c81fb42148ad70e8ed3bd7f3de4a16819e10'
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
          'Authorization': 'Token ec32c81fb42148ad70e8ed3bd7f3de4a16819e10'
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
          'Authorization': 'Token ec32c81fb42148ad70e8ed3bd7f3de4a16819e10'
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
