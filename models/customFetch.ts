import { FETCH_REVALIDATE_TIME } from '@/consts';

const FETCHOPTION: RequestInit = {
  next: { revalidate: FETCH_REVALIDATE_TIME },
};

export const customFetch = (props: any) => {
  return fetch(props, FETCHOPTION);
};
