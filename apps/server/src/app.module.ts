import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PrismaExceptionFilter } from './core/prisma-client-exception/prisma-client-exception.filter';
import { SocketGateway } from './events/socket.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { BookshelfModule } from './modules/bookshelf/bookshelf.module';
import { CollectBookshelfModule } from './modules/collect-bookshelf/collect-bookshelf.module';
import { FollowModule } from './modules/follow/follow.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.example'],
    }),
    UserModule,
    BookModule,
    BookshelfModule,
    FollowModule,
    CollectBookshelfModule,
    AuthModule,
    PrismaModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    SocketGateway,
    UserService,
  ],
})
export class AppModule {}
