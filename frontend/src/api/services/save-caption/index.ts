import api from '..';
import { ENDPOINT } from '../../../components/config/endpoint';
import { ACCESS_TOKEN } from '../../constant';
import { ISaveCaption } from '../../../types/caption';

export const saveCaption = async (data: ISaveCaption) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const response = await api.post(ENDPOINT.CAPTION.GET, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
export const getSavedCaptions = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const response = await api.get(ENDPOINT.CAPTION.GET, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteSavedCaptions = async (id: any) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const response = await api.delete(`${ENDPOINT.CAPTION.GET}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
