import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CreationModule } from './modules/creation/creation.module';
import { ValidationModule } from './modules/validation/validation.module';
import { CaptchaNotPresentStatus } from './exceptions/CaptchaNotPresent';
import { RedisModule } from './modules/redis/redis.module';
import { RedisService } from './modules/redis/redis.service';
import { CaptchaWrongAttemptStatus } from './exceptions/CaptchaWrongAttempt';

describe('AppController', () => {
  let appController: AppController;
  let redisService: RedisService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        CreationModule,
        ValidationModule,
        RedisModule,
      ],
      controllers: [AppController],
      providers: [RedisService],
    }).compile();

    appController = app.get<AppController>(AppController);
    redisService = app.get<RedisService>(RedisService);
  });

  describe('chapta', () => {
    it('Should create new chapta', async () => {
      const response = await appController.createChapta();

      expect(response.uuid).toBeDefined();
      expect(response.captcha).toBeDefined();
    });

    it('Should return error from validation', async () => {
      try {
        await appController.validateChapta({
          uuid: `${Math.random()}`,
          attempt: `${Math.random()}`,
        });
      } catch (err) {
        expect(err.status).toBe(CaptchaNotPresentStatus);
      }
    });

    it('Should return error from wrong attempt', async () => {
      try {
        const { uuid } = await appController.createChapta();
        await appController.validateChapta({
          uuid,
          attempt: `${Math.random()}`,
        });
      } catch (err) {
        expect(err.status).toBe(CaptchaWrongAttemptStatus);
      }
    });

    it('Should get pass validation for chapta', async () => {
      const chapta = await appController.createChapta();
      const solution = await redisService.getKey(chapta.uuid);
      let resp = false;
      try {
        await appController.validateChapta({
          uuid: chapta.uuid,
          attempt: solution,
        });
        resp = true;
      } catch (err) {
        resp = false;
      }
      expect(resp).toBe(true);
    });
  });
});
