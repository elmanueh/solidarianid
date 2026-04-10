import { CommunitiesModule } from '@app/communities/communities.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { KafkaBrokersModule } from '@solidarianid/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    CommunitiesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: true, // TODO: revisar esto para producción
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
})
export class AppModule {}
