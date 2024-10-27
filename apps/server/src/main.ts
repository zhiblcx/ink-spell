import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { env } from 'node:process';
import { AppModule } from './app.module';
import { appConfig } from './config/AppConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/', { prefix: '/static' });
  app.setGlobalPrefix(env.SERVER_PREFIX);
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

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
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(env.SERVER_PORT);
}

bootstrap();
