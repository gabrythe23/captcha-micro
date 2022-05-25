import { Module } from '@nestjs/common';
import { CreationService } from './creation.service';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'), // or use async method
      inject: [ConfigService],
    }),
  ],
  providers: [CreationService],
  exports: [CreationService],
})
export class CreationModule {}
