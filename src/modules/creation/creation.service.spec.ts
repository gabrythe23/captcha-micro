import { Test, TestingModule } from '@nestjs/testing';
import { CreationService } from './creation.service';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';

describe('CreationService', () => {
  let service: CreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreationService],
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        RedisModule.forRootAsync({
          useFactory: (configService: ConfigService) =>
            configService.get('redis'), // or use async method
          inject: [ConfigService],
        }),
      ],
    }).compile();

    service = module.get<CreationService>(CreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a new image', async () => {
    const captcha = await service.generate();
    expect(captcha.uuid).toBeDefined();
    expect(captcha.captcha).toBeDefined();
  });
});
