import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'node:process';
import { AppModule } from './app.module';
import { appConfig } from './config/AppConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(env.SERVER_PREFIX);
  const options = new DocumentBuilder()
    .setTitle(appConfig.APP_NAME)
    .setDescription(appConfig.DESCRIPTION)
    .setVersion(appConfig.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_URL, app, document);
  await app.listen(env.SERVER_PORT);
}

bootstrap();
