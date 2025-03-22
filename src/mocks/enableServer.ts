import { mockServer } from './server';

if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
  mockServer.listen();
}
