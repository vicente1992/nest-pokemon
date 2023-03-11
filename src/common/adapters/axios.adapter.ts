import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HpppAdapter } from '../interfaces/http-adapter';

@Injectable()
export class AxiosAdapter implements HpppAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error -Check logs');
    }
  }
}
