import crypto from 'node:crypto';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { endpointApi, VIDEOS } from './index';

beforeEach(() => {
  vi.stubEnv('EXTERNAL_API_KEY', 'test-secret');
  vi.spyOn(Date, 'now').mockReturnValue(1_787_579_729_000);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

test('signs GET requests without adding an empty JSON body', async () => {
  let signedRequest: Request | undefined;
  vi.stubGlobal(
    'fetch',
    vi.fn(async (request: Request) => {
      signedRequest = request;
      return new Response('{}');
    }),
  );

  await endpointApi.get(VIDEOS.live);

  const expectedSignature = crypto
    .createHmac('sha256', 'test-secret')
    .update('1787579729GET/api/v1/videos/live')
    .digest('hex');

  expect(signedRequest?.headers.get('X-Timestamp')).toBe('1787579729');
  expect(signedRequest?.headers.get('X-Signature')).toBe(expectedSignature);
});
