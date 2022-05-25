import { HttpException, HttpStatus } from '@nestjs/common';

export const CaptchaNotPresentStatus = HttpStatus.NOT_FOUND;

/**
 * define error for captcha not present in redis
 */
export class CaptchaNotPresent extends HttpException {
  constructor() {
    super(`Captcha not present`, CaptchaNotPresentStatus);
  }
}
