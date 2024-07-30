import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookshelfController } from './bookshelf.controller';
import { BookshelfService } from './bookshelf.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookshelfController],
  providers: [BookshelfService],
})
export class BookshelfModule {}
