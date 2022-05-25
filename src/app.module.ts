import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreationModule } from './modules/creation/creation.module';
import { ValidationModule } from './modules/validation/validation.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CreationModule,
    ValidationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
