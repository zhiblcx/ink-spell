import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.SERVER_PORT);
}
bootstrap();
