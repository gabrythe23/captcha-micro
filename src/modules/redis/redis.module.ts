import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as IORedisModule } from 'nestjs-redis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    IORedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'), // or use async method
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
