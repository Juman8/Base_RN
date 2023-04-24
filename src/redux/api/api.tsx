/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncStorage, LogApp} from '@utils';
import axios, {AxiosResponse} from 'axios';

import {ApiConfigs} from './api.config';

class AxiosClass {
  static instance: AxiosClass;

  static default() {
    if (!AxiosClass.instance) {
      AxiosClass.instance = new AxiosClass();
    }
    return AxiosClass.instance;
  }

  api: any;
  incrementRequestId = 0;
  token = '';
  storeKey = '';

  constructor() {
    this.api = axios.create(ApiConfigs);
    this.api.interceptors.response.use(this.interceptorResponses, (err: any) =>
      Promise.reject(err),
    );
    this.api.interceptors.request.use(this.interceptorRequests);
  }

  interceptorRequests = (config: any): Promise<any> => {

    const token = AsyncStorage.getString('APP_TOKEN');
    if (token) {
      config.headers.Authorization = token;
    }
    LogApp(config);
    return config;
  };

  interceptorResponses = (response: AxiosResponse): AxiosResponse => {
    LogApp(response);
    return response
  };

  setToken = async (token: string) => {
    this.token = token;
    this.api.defaults.headers.common.Authorization = token;
  };

  setTokenWithoutSaveLocal = async (token: string) => {
    this.token = token;
    this.api.defaults.headers.common.Authorization = token;
  };

  clear = () => {
    this.token = '';
    this.api.defaults.headers.common.Authorization = null;
  };
  getToken = () => this.token;
  setStoreKey = (key: string) => {
    this.storeKey = key;
  };

  getApi = () => {
    return this.api;
  }
}

export const axiosApi = AxiosClass.default();
