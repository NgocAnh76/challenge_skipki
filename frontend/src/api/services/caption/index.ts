import api from '..';
import { ENDPOINT } from '../../../components/config/endpoint';
import { ICaptionCreate } from '../../../types/caption';

export const createCaption = async (data: ICaptionCreate) => {
  const response = await api.post(ENDPOINT.CAPTION.GENERATE, data);
  return response.data;
};
