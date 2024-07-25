import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.example'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
