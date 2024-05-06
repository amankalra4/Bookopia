import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getLocalStorageItem } from ".";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://bookopia123-1e6b890a5fb8.herokuapp.com",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getLocalStorageItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error: any) => {
    console.error("error occurred in request", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    console.error("error occurred in response", error);
    return Promise.reject(error);
  }
);

const customAxios = {
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config),
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config),
};

export default customAxios;
