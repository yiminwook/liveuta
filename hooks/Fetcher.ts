import { sheetAPIReturnType } from '@/models/sheet/Insheet';
import axios, { AxiosResponse } from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { LOCAL_TIME },
} = getConfig();

export const fetcher =
  <T>() =>
  async (url: string) => {
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const dailyFetcher = async (url: string) => {
  try {
    const response: AxiosResponse<sheetAPIReturnType> = await axios.get(url);
    const now = Date.now() - 24 * 60 * 60 * 1000 + +LOCAL_TIME;
    const contents = response.data.contents.filter((data) => {
      return data.timestamp >= now;
    });
    return { total: contents.length, contents };
  } catch (error) {
    console.error(error);
  }
};

export const liveFetcher = async (url: string) => {
  try {
    const response: AxiosResponse<sheetAPIReturnType> = await axios.get(url);
    const contents = response.data.contents.filter((data) => data.isLive === true);
    return { total: contents.length, contents };
  } catch (error) {
    console.error(error);
  }
};
