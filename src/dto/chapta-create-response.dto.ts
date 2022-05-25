import { CaptchaGenerationResponse } from '../interfaces/captcha-generation-response.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ChaptaCreateResponseDto implements CaptchaGenerationResponse {
  @ApiProperty({
    description: 'This is a chapta image code, url encoded.',
    example: 'data:image/png;base64,iVBORw0KGgoABJRU5ErkJggg==',
  })
  captcha: string;

  @ApiProperty({
    description:
      'This param have to be stored for validation call as function as id for validation',
    example: 'b85903dc-4369-4252-a61b-081780c52dc3',
  })
  uuid: string;
}
