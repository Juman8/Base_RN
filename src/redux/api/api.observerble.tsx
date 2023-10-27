/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncStorage, LogApp} from '@utils';
import axios, {
  AxiosDefaults,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {ApiConfigs} from './api.config';
import {AxiosObservable, createObservable} from './observerble-axios';

class Axios {
  static defaults: AxiosDefaults = axios.defaults;
  static interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  } = axios.interceptors;
  axiosInstance: any;

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
    return response;
  };

  constructor() {
    this.axiosInstance = axios.create(ApiConfigs);
    this.axiosInstance.interceptors.response.use(
      this.interceptorResponses,
      (err: any) => Promise.reject(err),
    );
    this.axiosInstance.interceptors.request.use(this.interceptorRequests);
  }

  get defaults() {
    return this.axiosInstance.defaults;
  }

  get interceptors() {
    return this.axiosInstance.interceptors;
  }

  static request<T = any>(config: AxiosRequestConfig): AxiosObservable<T> {
    return createObservable(axios.request, config);
  }

  static get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.get, url, config);
  }

  static post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.post, url, data, config);
  }

  static put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.put, url, data, config);
  }

  static patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.patch, url, data, config);
  }

  static delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.delete, url, config);
  }

  static head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(axios.head, url, config);
  }

  request<T = any>(config: AxiosRequestConfig): AxiosObservable<T> {
    return createObservable(this.axiosInstance.request, config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.get, url, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.head, url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.post, url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.put, url, data, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.patch, url, data, config);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosObservable<T> {
    return createObservable<T>(this.axiosInstance.delete, url, config);
  }
}
export {Axios};
