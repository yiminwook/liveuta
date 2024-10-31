// @ts-ignore
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') throw new Error('Invaild HTTP method');
    const file = path.join(process.cwd(), 'public', 'assets', 'meta-image.png');
    const buffer = await readFile(file);
    //30일 보관
    res.setHeader('Cache-Control', 's-maxage=2592000, public');
    res.setHeader('Content-Type', 'image/jpeg');
    res.end(buffer);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'error' });
  }
};

export default handler;
