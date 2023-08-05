import { FETCH_REVALIDATE_TIME } from '@/consts';

/** @document https://nextjs.org/docs/app/api-reference/functions/fetch */
const FETCHOPTION: RequestInit = {
  next: { revalidate: FETCH_REVALIDATE_TIME },
};

export const customFetchCached = (props: any) => {
  return fetch(props, FETCHOPTION);
};

export const customFetchNoCached = (props: any) => {
  return fetch(props, { next: { revalidate: 0 }, cache: 'no-cache' });
};
