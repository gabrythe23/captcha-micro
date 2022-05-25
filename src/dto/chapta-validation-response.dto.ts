import { ApiProperty } from '@nestjs/swagger';
import { CaptchaValidationRequest } from '../interfaces/captcha-validation-request.interface';
import { CaptchaValidationResponse } from '../interfaces/captcha-validation-response.interface';

export class ChaptaValidationResponseDto implements CaptchaValidationResponse {
  @ApiProperty({
    description: 'Show if user have manage to decode chapta',
    example: true,
  })
  isValid: boolean;
}
