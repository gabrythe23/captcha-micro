import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Chapta microservice')
      .setDescription('service that create and validate chapta code')
      .setExternalDoc(
        'implementation flow',
        'https://excalidraw.com/#json=bRM8qL3hn05y8RUp3gVYg,bgn6G_1boXlJVWQrLtRs0A',
      )
      .setVersion('1.0')
      .addTag('chapta')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  const port = Number(process.env.PORT || process.env.WEB_PORT || 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => console.error(err));
