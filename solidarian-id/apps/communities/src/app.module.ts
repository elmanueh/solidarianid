import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { KafkaBrokersModule } from '@solidarianid/kafka';
import type { Request, Response } from 'express';
import { join } from 'node:path';

type GraphqlContextFactoryArgs = {
  req?: Request;
  res?: Response;
  extra?: {
    request?: Request;
  };
  connectionParams?: Record<string, unknown>;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    CommunitiesSharedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      autoSchemaFile:
        process.env.IN_DOCKER === 'true' ? '/app/schema.gql' : join(process.cwd(), 'apps/communities/src/schema.gql'),
      context: (ctx: GraphqlContextFactoryArgs) => {
        const request = ctx.req ?? ctx.extra?.request ?? ({ headers: ctx.connectionParams ?? {} } as Request);
        return { req: request, res: ctx.res };
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
})
export class AppModule {}
