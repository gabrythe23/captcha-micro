import { ApiProperty } from '@nestjs/swagger';
import { CaptchaValidationRequest } from '../interfaces/captcha-validation-request.interface';

export class ChaptaValidationRequestDto implements CaptchaValidationRequest {
  @ApiProperty({
    description:
      'This param is the uuid related to the captcha get from the first call',
    example: 'b85903dc-4369-4252-a61b-081780c52dc3',
  })
  uuid: string;

  @ApiProperty({
    description: 'This is the user attempt to validate chapta',
    example: '34sd3',
  })
  attempt: string;
}
