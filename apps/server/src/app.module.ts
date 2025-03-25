import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  HeaderResolver,
  I18nModule,
  I18nValidationPipe,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'node:path';
import { PrismaExceptionFilter } from './core/prisma-client-exception/prisma-client-exception.filter';
import { SocketModule } from './events/socket.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { BookshelfModule } from './modules/bookshelf/bookshelf.module';
import { CollectBookshelfModule } from './modules/collect-bookshelf/collect-bookshelf.module';
import { FollowModule } from './modules/follow/follow.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ReadHistoryModule } from './modules/read-history/read-history.module';
import { SystemModule } from './modules/system/system.module';
import { TagModule } from './modules/tag/tag.module';
import { TranslationModule } from './modules/translation/translation.module';
import { defaultLang } from './modules/translation/translation.service';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.example'],
    }),
    // // redis缓存
    // CacheModule.registerAsync({
    //   useFactory: async () => ({
    //     stores: [
    //       new Keyv({
    //         store: new CacheableMemory({
    //           // 缓存存活时间
    //           ttl: 60 * 1000,
    //           // 缓存大小
    //           lruSize: 1000,
    //         }),
    //       }),
    //       createKeyv(env.REDIS_LOCAL + env.REDIS_PORT),
    //     ],
    //   }),
    // }),
    I18nModule.forRoot({
      fallbackLanguage: defaultLang,
      // 加载器选项
      loaderOptions: {
        // 指定国际化路径
        path: path.join(__dirname, '/i18n/'),
        // 监听文件变化
        watch: true,
      },
      // 配置解析器，支持通过查询参数 'lang' 或 'l' 来指定语言
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
      ],
      typesOutputPath: path.join(__dirname, '../../src/i18n/i18n.generated.ts'),
    }),
    UserModule,
    BookModule,
    BookshelfModule,
    BookmarkModule,
    FollowModule,
    CollectBookshelfModule,
    AuthModule,
    PrismaModule,
    TranslationModule,
    ReadHistoryModule,
    AdminModule,
    TagModule,
    SystemModule,
    SocketModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: I18nValidationPipe },
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    UserService,
  ],
})
export class AppModule {}
