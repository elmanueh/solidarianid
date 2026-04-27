import { createSerwistRoute } from '@serwist/turbopack';
import { spawnSync } from 'node:child_process';

const revision = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout ?? crypto.randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  additionalPrecacheEntries: [
    { url: '/~offline', revision },
    { url: '/solidarian-logo.png', revision },
    { url: '/fondo-login.jpeg', revision },
    { url: '/fondo-register.jpeg', revision },
  ],
  swSrc: 'app/sw.ts',

  useNativeEsbuild: true,
});
