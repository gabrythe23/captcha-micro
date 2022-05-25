import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ChaptaDomainExceptionDto {
  @ApiProperty({
    description: 'Message explaining the error verbosely',
    example: 'Captcha not present',
  })
  message: string;

  @ApiProperty({
    description: 'Show the error status for exception',
    example: 404,
  })
  status: HttpStatus;
}
