import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CaptchaGenerationResponse } from './interfaces/captcha-generation-response.interface';
import { CreationService } from './modules/creation/creation.service';
import { ValidationService } from './modules/validation/validation.service';
import { ChaptaValidationRequestDto } from './dto/chapta-validation-request.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChaptaCreateResponseDto } from './dto/chapta-create-response.dto';
import { CaptchaNotPresentStatus } from './exceptions/CaptchaNotPresent';
import { ChaptaDomainExceptionDto } from './dto/chapta-domain-exception.dto';
import {
  CaptchaWrongAttempt,
  CaptchaWrongAttemptStatus,
} from './exceptions/CaptchaWrongAttempt';

@Controller()
@ApiTags('chapta')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly creationService: CreationService,
    private readonly validationService: ValidationService,
  ) {}

  @Get('create')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new chapta has been created',
    type: ChaptaCreateResponseDto,
  })
  async createChapta(): Promise<CaptchaGenerationResponse> {
    this.logger.log('Creating chapta');
    return await this.creationService.generate();
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: ChaptaValidationRequestDto,
    description: 'User try to decode chapta code',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The chapta was correct but for check user validity we must check checkValidity',
  })
  @ApiResponse({
    status: CaptchaNotPresentStatus,
    description: "The captcha that user try to validate doesn't exists anymore",
    type: ChaptaDomainExceptionDto,
  })
  @ApiResponse({
    status: CaptchaWrongAttemptStatus,
    description: "User's attempt failed",
    type: CaptchaWrongAttempt,
  })
  async validateChapta(
    @Body() body: ChaptaValidationRequestDto,
  ): Promise<void> {
    this.logger.log(`Validate chapta: ${body.uuid} with: ${body.attempt}`);
    return await this.validationService.checkValidity(body.uuid, body.attempt);
  }
}
