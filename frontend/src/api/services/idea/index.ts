import api from '..';
import { ENDPOINT } from '../../../components/config/endpoint';
import { IIdeaCreate } from '../../../types/idea';

export const createIdea = async (data: IIdeaCreate) => {
  const response = await api.post(ENDPOINT.IDEA.CREATE, data);
  return response.data;
};

export const createCaptionByIdea = async (data: IIdeaCreate) => {
  const response = await api.post(ENDPOINT.IDEA.CREATE_CAPTION, data);
  return response.data;
};
