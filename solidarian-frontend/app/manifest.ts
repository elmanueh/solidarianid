import type { MetadataRoute } from 'next';

export const APP_NAME = 'SolidarianID';
export const APP_DEFAULT_TITLE = 'SolidarianID';
export const APP_TITLE_TEMPLATE = '%s | SolidarianID';
export const APP_DESCRIPTION =
  'SolidarianID is a platform that connects volunteers with communities in need, fostering solidarity and collective action for a better world.';
export const APP_THEME_COLOR = '#ffffff';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    prefer_related_applications: false,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
