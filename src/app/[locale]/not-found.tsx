import type { Metadata } from 'next';
import Client from './not-found.client';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default function NotFound() {
  return <Client />;
}
