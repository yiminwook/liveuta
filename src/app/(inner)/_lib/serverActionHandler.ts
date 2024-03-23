import { ServerActionResponse } from '@/type';

export default async function serverActionHandler<T>(
  serverActionRes: Promise<ServerActionResponse<T>>,
) {
  const res = await serverActionRes;
  if (!res.result) {
    throw new Error(res.message);
  }
  return res.result;
}
