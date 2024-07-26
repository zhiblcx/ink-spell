import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { BookshelfModule } from './modules/bookshelf/bookshelf.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.example'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/static',
    }),
    UserModule,
    BookModule,
    BookshelfModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
