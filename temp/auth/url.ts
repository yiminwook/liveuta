import { jwtAuth } from '@/models/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

/** Authorization URL 반환 */
const handler = async (_req: NextApiRequest, res: NextApiResponse<{ url: string | undefined; message: string }>) => {
  try {
    const url = jwtAuth.generateAuthUrl({
      access_type: 'offline', //offline일경우 accessToken, refreshToken 둘다
      include_granted_scopes: true,
      scope: ['openid', 'profile', 'email'],
    });

    return res.status(200).json({ url, message: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ url: undefined, message: 'error' });
  }
};

export default handler;
