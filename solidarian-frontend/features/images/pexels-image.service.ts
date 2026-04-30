import { APP_URLS } from '@/features/config/urls';
import {
  BannerImageResult,
  GetDeterministicBannerParams,
  PexelsError,
  PexelsPhoto,
} from '@/features/images/pexels.types';

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

const globalSearchCache = new Map<string, PexelsPhoto[]>();

export class PexelsImageService {
  private readonly fallbackImageUrl = 'https://images.pexels.com/photos/1182691/pexels-photo-1182691.jpeg';

  private hashUuid(uuid: string): number {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      hash ^= uuid.codePointAt(i) || 0;
      hash = (hash << 5) - hash;
    }
    return Math.abs(hash) >>> 0;
  }

  private mapPhotoToBanner(photo: PexelsPhoto): BannerImageResult {
    return { large: photo.src.large };
  }

  private extractSearchKeywords(theme: string): string {
    const byMatch = new RegExp(/\bpor\s+([a-záéíóúñ\s]+)/i).exec(theme);
    if (byMatch?.[1]) {
      const extracted = byMatch[1].trim();
      if (extracted.length > 2) return extracted;
    }

    const stopWords = new Set([
      'proyecto',
      'comunidad',
      'campaña',
      'iniciativa',
      'jornada',
      'accion',
      'por',
      'de',
      'la',
      'el',
      'red',
      'asociacion',
      'fundacion',
      'colectivo',
    ]);
    const cleaned = theme
      .toLowerCase()
      .replaceAll(/\d+/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 2)
      .join(' ');

    return cleaned || theme;
  }

  private async searchPhotos(theme: string): Promise<PexelsPhoto[]> {
    const keywords = this.extractSearchKeywords(theme);
    const cacheKey = keywords.toLowerCase();
    const cached = globalSearchCache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${APP_URLS.gateway.photos()}?query=${encodeURIComponent(keywords)}&per_page=30&orientation=landscape&size=large&order=popular`
      );

      if (!response.ok) throw new PexelsError(`API error: ${response.status}`);

      const data = (await response.json()) as PexelsSearchResponse;
      if (!data.photos?.length) throw new PexelsError('No photos found');

      globalSearchCache.set(cacheKey, data.photos);
      return data.photos;
    } catch (error) {
      if (error instanceof PexelsError) throw error;
      throw new PexelsError(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async getDeterministicBanner(params: GetDeterministicBannerParams): Promise<BannerImageResult> {
    try {
      const { uuid, theme } = params;
      const trimmedUuid = uuid.trim();

      if (!trimmedUuid) throw new PexelsError('UUID cannot be empty');

      const photos = await this.searchPhotos(theme);
      if (!photos.length) return { large: this.fallbackImageUrl };

      const sorted = photos.toSorted((a, b) => a.id - b.id);
      const index = this.hashUuid(trimmedUuid) % sorted.length;
      return this.mapPhotoToBanner(sorted[index]);
    } catch (error) {
      if (error instanceof PexelsError) {
        console.error(`[Pexels] Error: ${error.message}`);
      } else {
        console.error('[Pexels] Unexpected error:', error);
      }
      return { large: this.fallbackImageUrl };
    }
  }
}
