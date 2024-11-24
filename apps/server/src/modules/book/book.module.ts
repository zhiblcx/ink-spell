import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ReadHistoryModule } from '@/read-history/read-history.module';

@Module({
  imports: [ReadHistoryModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
