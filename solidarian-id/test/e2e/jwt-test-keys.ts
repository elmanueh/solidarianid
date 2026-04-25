import { generateKeyPairSync } from 'node:crypto';

export function ensureJwtTestKeys(): void {
  const hasPrivateKey = Boolean(process.env.JWT_PRIVATE_KEY_BASE64);
  const hasPublicKey = Boolean(process.env.JWT_PUBLIC_KEY_BASE64);

  if (hasPrivateKey && hasPublicKey) {
    return;
  }

  const generated = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  process.env.JWT_PRIVATE_KEY_BASE64 = Buffer.from(generated.privateKey, 'utf8').toString('base64');
  process.env.JWT_PUBLIC_KEY_BASE64 = Buffer.from(generated.publicKey, 'utf8').toString('base64');
}
