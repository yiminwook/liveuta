import { mockServer } from '@/mocks/server';
import { expect, test } from 'vitest';

mockServer.listen();

test('msw should work', async () => {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();
  expect(data).toEqual({ message: 'Hello World!' });
});
