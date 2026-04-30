import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

type GraphqlContext = {
  req?: Request;
};

export function resolveRequestFromContext(context: ExecutionContext): Request {
  const contextType = context.getType<string>();

  if (contextType === 'http') {
    return context.switchToHttp().getRequest<Request>();
  }

  if (contextType === 'graphql') {
    const graphqlContext = GqlExecutionContext.create(context).getContext<GraphqlContext>();

    if (graphqlContext?.req) {
      return graphqlContext.req;
    }
  }

  throw new UnauthorizedException('Unable to resolve request from execution context');
}
