import ky from 'ky';
import { useSession } from '@/stores/session';

export const serverApi = ky.create({
  fetch: fetch, // next/fetch
  prefixUrl: process.env.NEXT_PUBLIC_SITE_URL + '/api',
  hooks: {
    beforeRequest: [(request) => {}],
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
        } catch (parseError) {
          console.log('[SERVER] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SITE_URL + '/api',
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = useSession.getState().session?.accessToken;

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
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
        } catch (parseError) {
          console.log('[CLIENT] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});

export const proxyApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SITE_URL + '/proxy',
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { error?: string } = await response.json();

          if (body?.error) {
            error.message = body.error;
          }
        } catch (parseError) {
          console.log('[PROXY] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});

export const revalidateApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/revalidate',
  hooks: {
    beforeRequest: [(request) => {}],
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
        } catch (parseError) {
          console.log('[REVALIDATE] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});
