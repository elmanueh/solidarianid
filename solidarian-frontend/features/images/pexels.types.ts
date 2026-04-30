export interface PexelsPhoto {
  id: number;
  src: { large: string };
}

export interface BannerImageResult {
  large: string;
}

export interface GetDeterministicBannerParams {
  uuid: string;
  theme: string;
}

export class PexelsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = PexelsError.name;
  }
}
