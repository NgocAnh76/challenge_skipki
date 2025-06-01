import { toast } from 'react-toastify';
import type { AxiosInstance } from 'axios';

export function SetupResponseInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      const apiMessage = error.response?.data?.message;

      const messageToShow =
        typeof apiMessage === 'string'
          ? apiMessage
          : Array.isArray(apiMessage)
            ? apiMessage.join(', ')
            : error.message || 'An error occurred.';

      switch (status) {
        case 401:
          toast.error(messageToShow || 'Session expired. Please login again.');
          break;
        case 403:
          toast.warning(
            messageToShow || 'You are not authorized to perform this action.',
          );
          break;
        case 500:
          toast.error(
            messageToShow || 'Internal server error. Please try again later.',
          );
          break;
        default:
          toast.error(messageToShow);
      }

      return Promise.reject(error);
    },
  );
}
