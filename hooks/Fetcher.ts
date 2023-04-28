import axios, { AxiosResponse } from 'axios';

export const fetcher = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
