'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder-image.svg',
  alt,
  ...props
}: Readonly<ImageWithFallbackProps>) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = failedSrc === src ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => {
        setFailedSrc(src);
      }}
    />
  );
}
