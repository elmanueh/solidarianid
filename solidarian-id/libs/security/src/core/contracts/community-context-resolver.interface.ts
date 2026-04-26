import { Resource } from '../constants/resource.enum';

export type ResolveCommunityContextInput = {
  resource: Resource;
  entityId: string;
};

export type ResolvedCommunityContext = {
  communityId: string;
};

export abstract class CommunityContextResolver {
  abstract resolve(input: ResolveCommunityContextInput): Promise<ResolvedCommunityContext | null>;
}
