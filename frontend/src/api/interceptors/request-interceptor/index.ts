import type { AxiosInstance } from 'axios';

import { ACCESS_TOKEN, BASE_DOMAIN_API } from '../../constant';

export function SetupRequestInterceptor(api: AxiosInstance) {
  api.interceptors.request.use(async config => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    try {
      config.url = `${BASE_DOMAIN_API}${config.url}`;
    } catch (error) {
      console.error('Request Interceptor Error:', error);
    }

    return config;
  });
}
