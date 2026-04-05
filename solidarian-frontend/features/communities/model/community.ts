export interface Community {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  causesCount?: number;
  category?: string;
  createdAt?: string;
}

export interface CreateCommunityDTO {
  name: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export interface UpdateCommunityDTO extends Partial<CreateCommunityDTO> {}
