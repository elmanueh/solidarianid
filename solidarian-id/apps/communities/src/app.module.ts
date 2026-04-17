import { CommunitiesModule } from '@app/communities/communities.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { KafkaBrokersModule } from '@solidarianid/kafka';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    CommunitiesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      introspection: true,
      autoSchemaFile:
        process.env.IN_DOCKER === 'true' ? '/app/schema.gql' : join(process.cwd(), 'apps/communities/src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
})
export class AppModule {}
