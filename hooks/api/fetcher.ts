import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import addToast from '@/utils/handleToast';

export const fetcher = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    addToast('error', '통신에러', false);
    throw error;
  }
};
