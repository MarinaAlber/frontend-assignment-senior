import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type AbortRequestFn = (() => void) | undefined;

type XHR = Promise<AxiosResponse>;
type HttpClient = {
  xhr: XHR;
  abortRequest?: AbortRequestFn;
};

const axiosInstance: AxiosInstance = axios.create();

const returnHttpRequest = (
  xhr: XHR,
  controller?: AbortController
): HttpClient => ({
  xhr,
  abortRequest: () => controller?.abort(),
});

export const apiHandler = {
  get: (url: string, config?: AxiosRequestConfig): HttpClient => {
    const controller = new AbortController();
    const getXHRCall = axiosInstance.get(url, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: getXHRCall,
      };
    }

    return returnHttpRequest(getXHRCall, controller);
  },

  post: (
    url: string,
    data?: object | string,
    config?: AxiosRequestConfig
  ): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.post(url, data, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpRequest(postXHRCall, controller);
  },
  put: (
    url: string,
    data?: object | string,
    config?: AxiosRequestConfig
  ): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.put(url, data, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpRequest(postXHRCall, controller);
  },
  delete: (url: string, config?: AxiosRequestConfig): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.delete(url, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpRequest(postXHRCall, controller);
  },
  checkIsCancelError: (error: AxiosError) => {
    return axios.isCancel(error);
  },
  getUri: (config: AxiosRequestConfig) => axios.getUri(config),
};

export type { AxiosError as ApiError, HttpClient, AbortRequestFn };
