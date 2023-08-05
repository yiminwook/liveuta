/** @document https://nextjs.org/docs/app/api-reference/functions/fetch */
const FETCHOPTION: RequestInit = {
  //fetch cache 안되게 설정
  cache: 'no-cache',
  next: { revalidate: 0 },
};

export const customFetch = (props: any) => {
  return fetch(props, FETCHOPTION);
};
