import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'node:process';
import { AppModule } from './app.module';
import { appConfig } from './config/AppConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/', { prefix: '/static' });
  app.setGlobalPrefix(env.SERVER_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle(appConfig.APP_NAME)
    .setDescription(appConfig.DESCRIPTION)
    .setVersion(appConfig.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_URL, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(env.SERVER_PORT);
}

bootstrap();
