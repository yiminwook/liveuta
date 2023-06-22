import { GoogleClient } from '@/temp/auth/googClient';
// import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

/** GET: 쿠키 저장 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error('Fail to get Code');
    const codeQuery = code?.toString();
    const token = await GoogleClient.getInstance().getToken(codeQuery);
    const accessToken = token.tokens.access_token;
    const refreshToken = token.tokens.refresh_token;
    if (!(accessToken && refreshToken)) throw new Error('Fail to get Tokens');
    // const encodeAccessToken = jwt.sign(accessToken, 'ACCESS_SECRET');
    // const encodeRefreshToken = jwt.sign(refreshToken, 'REFRESH_SECRET');
    // const expiresIn = 30 * 24 * 60 * 60 * 1000;
    res.setHeader('location', '/');
    res.setHeader('Set-Cookie', [
      // `accessCookie=${encodeAccessToken};` +
      // `Max-Age=${expiresIn};Expires=${expiresIn};` +
      `Path=/;HttpOnly;Secure;SameSite=strict;`,
      // `refreshCookie=${encodeRefreshToken};` + `Path=/;HttpOnly;Secure;SameSite=strict;`,
    ]);
    res.statusCode = 308;
    res.end();
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
};

export default handler;
