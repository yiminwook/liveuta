import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'error' });
  }
};

export default handler;
