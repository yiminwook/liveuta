'server-only';
import CryptoJs from 'crypto-js';
import ky from 'ky';

export const END_POINT = 'https://instance-20251221-0510.tail7609b.ts.net';
export const VERSION = 'v1';

export const VIDEOS = {
  live: 'videos/live',
  upcoming: 'videos/upcoming',
  all: 'videos/all',
};

export const CHANNELS = {
  index: 'channels',
  meta: 'channels/meta',
  paginated: 'channels/paginated',
};

export const featured = {
  index: 'featured',
};

const getTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

const hmac = (args: { timestamp: string; method: string; path: string; body: string }) => {
  const message = `${args.timestamp}${args.method}${args.path}${args.body}`;
  const key = process.env.EXTERNAL_API_KEY;
  console.log('[SERVER] message', message);
  return CryptoJs.HmacSHA256(message, key).toString(CryptoJs.enc.Hex);
};

export const endpointApi = ky.create({
  prefixUrl: `${END_POINT}/api/${VERSION}`,
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          const method = request.method;
          const url = new URL(request.url);
          const path = url.pathname;
          // .replace('/api/v1', '');
          const query = url.search;

          const body = request.body ? await request.clone().text() : '';
          console.log('[SERVER] body', body);
          const timestamp = getTimestamp();
          const signature = hmac({
            timestamp,
            method,
            path: path + query,
            body,
          });
          console.log('[SERVER] signature', signature);
          console.log('[SERVER] timestamp', timestamp);

          request.headers.set('X-Signature', signature);
          request.headers.set('X-Timestamp', timestamp);
        } catch (error) {
          console.log('[SERVER] error', error);
        }
      },
    ],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { message?: string } = await response.json();

          if (body?.message) {
            error.message = body.message;
          }
          console.log('[SERVER] ky parseError', body);
        } catch (parseError) {
          console.log('[SERVER] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});
