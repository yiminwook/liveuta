/** @document https://nextjs.org/docs/app/api-reference/functions/fetch */

export const customFetchNoCached = (props: any) => {
  //cache: no-store, revalidate: 0 둘중 하나면 설정해야함.
  return fetch(props, { cache: 'no-store' });
};
