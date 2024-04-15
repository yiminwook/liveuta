import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Live Uta',
    short_name: 'Live Uta',
    description: 'Show V-Tuber Utawaku schedule',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    icons: [
      {
        src: '/assets/icon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon-256-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/assets/icon-384-384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/assets/icon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
