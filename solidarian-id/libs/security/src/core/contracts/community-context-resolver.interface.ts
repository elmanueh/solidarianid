import { EntityType } from '../constants/entity-type.enum';

export type ResolveCommunityContextInput = {
  entityType: EntityType;
  entityId: string;
};

export type ResolvedCommunityContext = {
  communityId: string;
};

export abstract class CommunityContextResolver {
  abstract resolve(input: ResolveCommunityContextInput): Promise<ResolvedCommunityContext | null>;
}
