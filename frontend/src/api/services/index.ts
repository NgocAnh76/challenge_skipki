import axios from 'axios';
import { BASE_DOMAIN_API } from '../constant';
import { SetupRequestInterceptor } from '../interceptors/request-interceptor';
import { SetupResponseInterceptor } from '../interceptors/response-interceptor';

const api = axios.create({
  baseURL: BASE_DOMAIN_API,
  headers: {
    'content-Type': 'application/json',
  },
});

SetupRequestInterceptor(api);
SetupResponseInterceptor(api);

export default api;
