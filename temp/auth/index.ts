import type { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';

/** GET: 로그인여부 */
const handler = async (req: NextApiRequest, res: NextApiResponse<{ isLogin: boolean; message: string }>) => {
  try {
    const { accessCookie, refreshCookie } = req.cookies;
    if (!(accessCookie && refreshCookie)) {
      return res.status(200).json({ isLogin: false, message: 'Not Logged in' });
    }
    // const decodeAccessToken = jwt.verify(accessCookie, 'ACCESS_SECRET');

    return res.status(200).json({ isLogin: true, message: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ isLogin: false, message: 'error' });
  }
};

export default handler;

// https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#httprest_3
