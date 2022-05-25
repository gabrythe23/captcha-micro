import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { v4 } from 'uuid';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { RedisService } from '../redis/redis.service';

describe('ValidationService', () => {
  let service: ValidationService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService, RedisService],
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        RedisModule,
      ],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check the redis key', async () => {
    const uuid = v4();
    const captcha = (Math.random() + 1).toString(36).substring(7);
    await redisService.addKey(uuid, captcha);
    let resp = false;
    try {
      await service.checkValidity(uuid, captcha);
      resp = true;
    } catch (err) {
      resp = false;
    }
    expect(resp).toBe(true);
  });
});
