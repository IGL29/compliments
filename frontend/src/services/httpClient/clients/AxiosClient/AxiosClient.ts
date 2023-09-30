import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosClientService {
  public get<T = unknown, U = unknown>(url: string, options?: AxiosRequestConfig<U>) {
    return axios.get<typeof url, AxiosResponse<T>>(url, options);
  }

  public post<T = unknown, U = unknown>(url: string, data?: U, options?: AxiosRequestConfig<U>) {
    return axios.post<typeof url, AxiosResponse<T>>(url, data, options);
  }

  public put<T = unknown, U = unknown>(url: string, data?: U, options?: AxiosRequestConfig<U>) {
    return axios.put<typeof url, AxiosResponse<T>>(url, data, options);
  }

  public patch<T = unknown, U = unknown>(url: string, data?: U, options?: AxiosRequestConfig<U>) {
    return axios.patch<typeof url, AxiosResponse<T>>(url, data, options);
  }

  public delete<T = unknown, U = unknown>(url: string, options?: AxiosRequestConfig<U>) {
    return axios.delete<typeof url, AxiosResponse<T>>(url, options);
  }
}

export { AxiosClientService };
