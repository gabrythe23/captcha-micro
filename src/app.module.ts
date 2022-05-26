import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreationModule } from './modules/creation/creation.module';
import { ValidationModule } from './modules/validation/validation.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/static'),
    }),
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
