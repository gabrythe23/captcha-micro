import { HttpException, HttpStatus } from '@nestjs/common';

export const CaptchaWrongAttemptStatus = HttpStatus.BAD_REQUEST;

/**
 * define error for captcha not present in redis
 */
export class CaptchaWrongAttempt extends HttpException {
  constructor() {
    super(`Captcha attempt is failed`, CaptchaWrongAttemptStatus);
  }
}
