import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { RedisModule as IORedisModule } from 'nestjs-redis/dist/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import configuration from '../../config/configuration';

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        IORedisModule.forRootAsync({
          useFactory: (configService: ConfigService) =>
            configService.get('redis'), // or use async method
          inject: [ConfigService],
        }),
      ],
      providers: [RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add key to redis check and delete it', async () => {
    const uuid = v4();
    const captcha = (Math.random() + 1).toString(36).substring(7);

    await service.addKey(uuid, captcha);
    let result: string | null = await service.getKey(uuid);
    expect(result).toBe(captcha);
    await service.delKey(uuid);
    result = await service.getKey(uuid);
    expect(result).toBe(null);
  });
});
