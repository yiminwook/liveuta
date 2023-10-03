import { cookies } from 'next/headers';

export const getCookies = () => {
  const cookieStore = cookies();
  const select = cookieStore.get('select')?.value || 'all';
  return { select };
};
