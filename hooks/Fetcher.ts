import axios, { AxiosResponse } from 'axios';

export const fetcher =
  <T>() =>
  async (url: string) => {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  };
