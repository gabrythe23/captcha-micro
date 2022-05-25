import { Injectable } from '@nestjs/common';
import { CaptchaNotPresent } from '../../exceptions/CaptchaNotPresent';
import { RedisService } from '../redis/redis.service';
import { CaptchaValidationResponse } from '../../interfaces/captcha-validation-response.interface';
import { CaptchaWrongAttempt } from '../../exceptions/CaptchaWrongAttempt';

@Injectable()
export class ValidationService {
  /**
   *
   * @param {RedisService} redisService
   */
  constructor(readonly redisService: RedisService) {}

  /**
   * check if captcha attempt is valid or not
   * @param {string} uuid id of captcha
   * @param {string} captchaAttempt user's attempt
   * @returns {void}
   * @async
   */
  async checkValidity(uuid: string, captchaAttempt: string): Promise<void> {
    // get captcha solution from redis
    const captchaResult = await this.redisService.getKey(uuid);
    // check if there's solution (and if is valid(
    if (!captchaResult) throw new CaptchaNotPresent();
    // if it is invalidate deleting it
    await this.redisService.delKey(uuid);
    // if attempt didn't match throw error
    if (captchaResult !== captchaAttempt) throw new CaptchaWrongAttempt();
  }
}
