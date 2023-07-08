import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const fetcher = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('통신에러');
    throw error;
  }
};
