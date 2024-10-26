import { Module } from '@nestjs/common';
import { CollectBookshelfController } from './collect-bookshelf.controller';
import { CollectBookshelfService } from './collect-bookshelf.service';

@Module({
  imports: [],
  controllers: [CollectBookshelfController],
  providers: [CollectBookshelfService],
})
export class CollectBookshelfModule {}
