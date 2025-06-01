import api from '..';
import { ENDPOINT } from '../../../components/config/endpoint';

export const createAccessCode = async (data: { phoneNumber: string }) => {
  const response = await api.post(ENDPOINT.AUTH.ACCESS_CODE, data);
  return response.data;
};
export const validateAccessCode = async (data: { phoneNumber: string; code: string }) => {
  const response = await api.post(ENDPOINT.AUTH.VALIDATE_CODE, data);
  return response.data;
};
