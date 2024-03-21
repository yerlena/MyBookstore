import axios from 'axios';
import axiosRetry from 'axios-retry';

export function createAxios(): any {
  const axiosInstance = axios.create();
  return axiosInstance;
}

export function setupAxios(token: string, axiosInstance: any = undefined): any {
  if (axiosInstance) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosRetry(axiosInstance);
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosRetry(axios);
  }
}

import { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export function getAxiosInstance(): AxiosInstance {
  return axiosInstance;
}

export function setAxiosInstance(newAxiosInstance: AxiosInstance): void {
  axiosInstance = newAxiosInstance;
}
