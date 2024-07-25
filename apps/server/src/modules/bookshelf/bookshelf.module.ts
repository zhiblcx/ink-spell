import { Module } from '@nestjs/common';
import { BookshelfController } from './bookshelf.controller';
import { BookshelfService } from './bookshelf.service';

@Module({
  controllers: [BookshelfController],
  providers: [BookshelfService],
})
export class BookshelfModule {}
