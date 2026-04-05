export interface Cause {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  communityId: string;
  progress?: number;
  goal?: number;
  supporters?: number;
  distance?: string;
  createdAt?: string;
}

export interface CreateCauseDTO {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  communityId: string;
}

export interface UpdateCauseDTO extends Partial<CreateCauseDTO> {}
