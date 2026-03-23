import { CommunitiesApiPort } from '@app/admin/administrator/model/domain/ports/output/communities.api.port';
import { CommunitiesApiGrpcServiceImpl } from '@app/admin/administrator/model/infrastructure/apis/communities.grpc.service.impl';
import { CommunitiesApiServiceImpl } from '@app/admin/administrator/model/infrastructure/apis/communities.service.impl';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'COMMUNITIES_PACKAGE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('COMMUNITIES_GRPC_URL') ?? '0.0.0.0:50052',
            package: 'solidarianid.grpc.communities.v1',
            protoPath: join(process.cwd(), 'libs/grpc-common/spec/solidarianid/grpc/communities/communities.proto'),
          },
        }),
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: CommunitiesApiPort,
      useClass: CommunitiesApiGrpcServiceImpl,
    },
    CommunitiesApiServiceImpl,
  ],
  exports: [CommunitiesApiPort],
})
export class CommunitiesModule {}
