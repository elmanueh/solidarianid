'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder-image.svg',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={isError ? fallbackSrc : src}
      alt={alt}
      onError={() => {
        setIsError(true);
      }}
    />
  );
}
