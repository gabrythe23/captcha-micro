import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}
